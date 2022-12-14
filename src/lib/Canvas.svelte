<script>
	// @ts-nocheck

	// Data update Event options:
	/**
	 * 1. dispatch even to Parent
	 * 2. dispatch event to node via directive
	 * 3. bind the data through a prop
	 */
	import { createEventDispatcher } from 'svelte';
	import PointerTracker from '@douganderson444/pointer-tracker';
	import { nanoid } from 'nanoid';

	import CursorMarker from './CursorMarker.svelte';
	import Links from './Links.svelte';
	import Highlighter from './Highlighter.svelte';
	import { generateLinkLabel } from './utils.js';

	export let data;
	export let opts = {};

	const dispatch = createEventDispatcher();

	let highlighters = {};

	let canvas;
	let connecting;
	let marker;
	let tempLink = null; // connecting, temp tempLink from node to marker

	const MARKER = 'marker';
	const DROPZONE = 'dropzone';

	let left = 0;
	let top = 0;

	function handler(p, e) {
		e.stopPropagation(); // afftect this event target only, not the ones below it
		e.preventDefault(); // prevents scrolling whilst dragging
		left = p.pageX - canvas.offsetLeft;
		top = p.pageY - canvas.offsetTop;
	}

	function calcOffsetFromCanvas(child) {
		if (!child) return;
		if (child == canvas) return { x: child.offsetLeft, y: child.offsetTop };
		// need to get the offetTop from canvas, which may be different from the sourceEl offetTop
		// get different between bounding rect top between sourceEl and canvas
		let sourceOffsetTop = child.getBoundingClientRect().top;
		let canvasOffsetTop = canvas.getBoundingClientRect().top;
		let sourceOffsetTopDiff = sourceOffsetTop - canvasOffsetTop; // zero if same
		let sourceOffsetTopDiffPx = sourceOffsetTopDiff * window.devicePixelRatio;

		// same for left
		let sourceOffsetLeft = child.getBoundingClientRect().left;
		let canvasOffsetLeft = canvas.getBoundingClientRect().left;
		let sourceOffsetLeftDiff = sourceOffsetLeft - canvasOffsetLeft; // zero if same
		let sourceOffsetLeftDiffPx = sourceOffsetLeftDiff * window.devicePixelRatio;

		return { x: sourceOffsetLeftDiff, y: sourceOffsetTopDiff };
	}

	function connectable(node, options) {
		if (!node.id) node.id = nanoid();

		// TODO: Handle absolute nodes, create a relative child?
		if (!node.style.position) node.style.position = 'relative';

		let highlight = false;
		let overZone;

		// add to list of nodes to highlight when connecting
		highlighters[node.id] = { node, highlight };

		// Applying Restrictions
		// limit source count (single, multiples), target count, etc. # of connections per connectable
		let pointerTracker;

		// Add data-* attriutes to connectable node
		if (options?.dataset) node.dataset.dataset = JSON.stringify(options.dataset);

		if (!options?.restrictions?.startOnly) node.dataset.dropzone = true;

		if (!options?.restrictions?.dropOnly)
			pointerTracker = new PointerTracker(node, {
				start(pointer, event) {
					// track only 1 pointer at a time
					if (pointerTracker.currentPointers.length === 1) return false;

					connecting = true;
					handler(pointer, event);

					return true;
				},
				move(previousPointers, changedPointers, event) {
					handler(pointerTracker.currentPointers[0], event);

					tempLink = {
						id: node.id + '-to-',
						source: { id: node.id },
						target: { id: MARKER },
						opts: {
							label: {
								enabled: true,
								value: generateLinkLabel(data.nodes, node.id)
							}
						}
					};

					// unhightlight prev
					if (overZone) highlighters[overZone.id].highlight = false;

					// simulate mouseover for mobile
					overZone =
						document
							.elementFromPoint(
								pointerTracker.currentPointers[0].clientX,
								pointerTracker.currentPointers[0].clientY
							)
							?.closest(`[data-dropzone]`) || null;

					if (overZone?.id) {
						highlighters[overZone.id].highlight = true;
					}
				},
				end: (pointer, event, cancelled) => {
					marker.style.display = 'none'; // so elementFromPoint gets what is underneath instead
					// marker = null; // this may be overkill?

					connecting = false;

					// reset
					if (highlighters && overZone && overZone.id && highlighters[overZone.id].highlight) {
						highlighters[overZone.id].highlight = false;
					}
					overZone = null;

					// get closest dropzone target
					let drop = document.elementFromPoint(pointer.clientX, pointer.clientY);
					let zone = drop.closest(`[data-dropzone]`);

					// remove temp tempLink
					tempLink = null;

					if (!zone || !zone?.id || !node || !node?.id) return;

					// update links
					const newLink = {
						id: node.id + '-to-' + zone.id,
						source: { id: node.id },
						target: { id: zone.id },
						opts: {
							label: {
								enabled: true,
								value: generateLinkLabel(data.nodes, node.id, zone.id)
							}
						}
					};

					console.log({ newLink });

					data.links = [...data.links, newLink];

					// emit data via event
					if (options?.dataset || zone?.dataset?.dataset) {
						const detail = {
							source: { dataset: options?.dataset || null },
							target: { dataset: zone?.dataset?.dataset ? JSON.parse(zone.dataset.dataset) : null }
						};
						console.log(detail);

						dispatch('connected', detail);
					}
				},
				avoidPointerEvents: true, // mkaes mobile work better
				eventListenerOptions: { capture: true, passive: false } // passive: false if no need to evt.preventDefault
			});

		return {
			update(params) {
				// the value of `params` has changed
			},

			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<svelte:window
	on:resize={(e) => {
		data.links = data.links;
	}}
/>

<div bind:this={canvas} class="relative" data-canvas>
	{#if connecting}
		<!-- Show where the mouse/touch pointer is -->
		<CursorMarker bind:marker {left} {top} id={MARKER}>
			<slot name="marker">
				<!-- Default cursor indicator marker below can be overriden in Parent Component slot -->
				<div
					class="h-4 w-4 md:h-16 md:w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[1em] md:border-[1em]"
				/>
			</slot>
		</CursorMarker>
	{/if}

	{#if canvas}
		<!-- The area where the connectable directive may be used (the "let: connectable" area) -->
		<slot {connectable} />
	{/if}

	<!-- TODO: Tempoary Link while connecting -->
	<Links links={[tempLink]} {calcOffsetFromCanvas} {...opts?.links} />
	<!-- All connected links ("permanent") -->
	<Links links={data.links} {calcOffsetFromCanvas} {...opts?.links} />

	<!-- highlighters -->
	{#each [...Object.entries(highlighters)] as [nodeid, { node, highlight }]}
		<Highlighter {node} {highlight} />
	{/each}
</div>

<style lang="postcss"></style>
