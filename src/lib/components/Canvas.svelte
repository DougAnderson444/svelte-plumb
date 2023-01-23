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
	import { generateLinkLabel } from '$lib/utils.js';
	import { DELEGATOR, DROPZONE, MARKER } from '$lib/constants.js';

	export let data;
	export let opts = {};

	const dispatch = createEventDispatcher();

	let highlighters = {};

	let canvas;
	let connecting;
	let marker = null;
	let tempLink = null; // connecting, temp link from node to marker

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

		// source id can be either data-sourceid or node.id
		let sourceid = node?.dataset?.sourceid ? node?.dataset?.sourceid : node.id;

		// TODO: Handle absolute nodes, create a relative child?
		if (
			!node.style.position ||
			(node.style.position !== 'absolute' && node.style.position !== 'relative')
		)
			node.style.position = 'relative';

		let highlight = false;
		let overZone;

		// add to list of nodes to highlight when connecting
		highlighters[sourceid] = { node, highlight };

		// Applying Restrictions
		// limit source count (single, multiples), target count, etc. # of connections per connectable
		let pointerTracker;

		let startPoint;
		// if there is a startPoint, then add that to the nodeElement
		if (options?.startPoint) {
			node.dataset[DELEGATOR] = true;
			// startPoint is a svelte component which is mounted to the node as target
			// and is used to start the connection
			startPoint = new options.startPoint({ target: node });
			startPoint.$on('ready', (event) => createHandleTracker(node, event.detail.handle));
			startPoint.$set({ mounted: true }); // trigger the event fire to the listener above
		} else {
			// if no startPoint, then add the whole node as the startPoint
			createHandleTracker(node);
		}

		// Add data-* attriutes to connectable node
		if (options?.dataset) node.dataset.dataset = JSON.stringify(options.dataset);

		if (!options?.restrictions?.startOnly) node.dataset[DROPZONE] = true;

		function createHandleTracker(node, handle = false) {
			if (!options?.restrictions?.dropOnly) {
				pointerTracker = new PointerTracker(node, {
					start(pointer, event) {
						// track only 1 pointer at a time
						if (pointerTracker.currentPointers.length === 1) return false;

						// if (options?.startPoint) constrain connectable to only this child element
						if (options?.startPoint && event.target !== handle) return false;

						connecting = true;
						handler(pointer, event);

						return true;
					},
					move(previousPointers, changedPointers, event) {
						handler(pointerTracker.currentPointers[0], event);

						tempLink = {
							id: sourceid + '-to-',
							source: { id: sourceid, startPoint: options?.startPoint || false },
							target: { id: MARKER },
							opts: {
								label: {
									enabled: true,
									value: generateLinkLabel(data?.nodes, sourceid)
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
								?.closest(`[data-${DROPZONE}]`) || null;

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

						// get closest drop zone target
						let drop = document.elementFromPoint(pointer.clientX, pointer.clientY);
						let zone = drop?.closest(`[data-${DROPZONE}]`);

						// remove temp tempLink
						tempLink = null;

						if (!zone || !zone?.id || !node || !node?.id) return;

						// update links
						const newLink = {
							id: sourceid + '-to-' + zone.id,
							source: { id: sourceid, startPoint: options?.startPoint || false },
							target: { id: zone.id },
							opts: {
								label: {
									enabled: true,
									value: generateLinkLabel(data?.nodes, sourceid, zone.id)
								}
							}
						};

						data.links = [...data.links, newLink];

						// emit data via event
						if (options?.dataset || zone?.dataset?.dataset) {
							const detail = {
								source: { dataset: options?.dataset || null },
								target: {
									dataset: zone?.dataset?.dataset ? JSON.parse(zone.dataset.dataset) : null
								}
							};
							dispatch('connected', detail);
						}
					},
					avoidPointerEvents: true, // mkaes mobile work better
					eventListenerOptions: { capture: true, passive: false } // passive: false if no need to evt.preventDefault
				});
			}
		}

		return {
			update(params) {
				// the value of `params` has changed
				options = params;
			},

			destroy() {
				// the node has been removed from the DOM
				pointerTracker?.stop();
				if (startPoint) startPoint.$destroy();
			}
		};
	}

	const removeLink = (e) => (data.links = data.links.filter((l) => l.id !== e.detail));
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
	{#if tempLink}
		<Links links={[tempLink]} {...opts?.links} />
	{/if}
	<!-- All connected links ("permanent") -->
	{#if data.links && data.links.length > 0}
		<Links links={data.links} {...opts?.links} on:removeLink={removeLink} />
	{/if}

	<!-- highlighters -->
	{#each [...Object.entries(highlighters)] as [nodeid, { node, highlight }]}
		<Highlighter {node} {highlight} />
	{/each}
</div>

<style lang="postcss"></style>
