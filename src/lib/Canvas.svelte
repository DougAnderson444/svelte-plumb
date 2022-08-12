<script>
	// @ts-nocheck

	// Data update Event options:
	/**
	 * 1. dispatch even to Parent
	 * 2. dispatch event to node via directive
	 * 3. bind the data through a prop
	 */

	import PointerTracker from '@douganderson444/pointer-tracker';
	import { nanoid } from 'nanoid';

	import CursorMarker from './CursorMarker.svelte';
	import Links from './Links.svelte';
	import Highlighter from './Highlighter.svelte';
	import { generateLinkLabel } from './utils.js';

	export let data;
	export let opts = {};

	let highlighters = {};

	let canvas;
	let connecting;
	let marker;

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

	function connectable(node, bar) {
		if (!node.id) node.id = nanoid();

		if (!node.dataset['dropzone']) {
			node.dataset.dropzone = true;
		}

		// TODO: Handle absolute nodes, create a relative child?
		if (!node.style.position) node.style.position = 'relative';

		// link from node to marker
		let link;
		let highlight = false;
		let overZone;

		// add to list of nodes to highlight when connecting
		highlighters[node.id] = { node, highlight };

		let pointerTracker = new PointerTracker(node, {
			start(pointer, event) {
				// track only 1 pointer at a time
				if (pointerTracker.currentPointers.length === 1) return false;

				connecting = true;
				handler(pointer, event);

				return true;
			},
			move(previousPointers, changedPointers, event) {
				handler(pointerTracker.currentPointers[0], event);

				link = {
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
						.closest(`[data-dropzone]`) || null;

				if (overZone?.id) {
					highlighters[overZone.id].highlight = true;
				}

				// Prevent duplicate links
				const check = data.links.find((el) => el.source.id == node.id && el.target.id == MARKER);
				if (check == undefined) data.links = [...data.links, link]; // add latest link
				else data.links = data.links; // simply refresh Svelte UI <Links />
			},
			end: (pointer, event, cancelled) => {
				marker.style.display = 'none'; // so elementFromPoint gets what is underneath instead

				// marker = null;
				connecting = false;

				// reset
				if (highlighters && overZone && overZone.id && highlighters[overZone.id].highlight) {
					highlighters[overZone.id].highlight = false;
				}
				overZone = null;

				// get closest dropzone target
				let drop = document.elementFromPoint(pointer.clientX, pointer.clientY);
				let zone = drop.closest(`[data-dropzone]`);

				// remove temp link
				data.links = data.links
					.map((el) => (el.source.id == node.id && el.target.id == MARKER ? null : el))
					.filter((r) => r);

				if (!zone || !zone?.id) return;

				// get dropzone target id
				data.links = [
					...data.links,
					{
						id: node.id + '-to-' + zone.id,
						source: { id: node.id },
						target: { id: zone.id },
						opts: {
							label: {
								enabled: true,
								value: generateLinkLabel(data.nodes, node.id, zone.id)
							}
						}
					}
				]; // add latest link
			},
			avoidPointerEvents: true, // mkaes mobile work better
			eventListenerOptions: { capture: true, passive: false } // passive: false if no need to evt.preventDefault
		});

		return {
			update(bar) {
				// the value of `bar` has changed
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

<div
	bind:this={canvas}
	class="relative border-dashed border-2 border-sky-500 rounded-lg bg-slate-100/10 m-4 p-4 z-50"
>
	<div class="text-black font-bold">Directive is available within the slot as a slot prop</div>

	{#if connecting}
		<CursorMarker bind:marker {left} {top} id={MARKER}>
			<slot name="marker">
				<!-- Default cursor indicator marker below can be overriden in Parent Component slot -->
				<div
					class="h-32 w-32 md:h-16 md:w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[4em] md:border-[2em] "
				/>
			</slot>
		</CursorMarker>
	{/if}

	{#if canvas}
		<slot {connectable} />
	{/if}

	<Links links={data.links} {calcOffsetFromCanvas} {...opts?.links} />

	<!-- highlighters -->
	{#each [...Object.entries(highlighters)] as [nodeid, { node, highlight }]}
		<Highlighter {node} {highlight} />
	{/each}
</div>

<style lang="postcss"></style>
