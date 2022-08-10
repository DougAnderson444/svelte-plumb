<script>
	// @ts-nocheck

	// Data update Event options:
	/**
	 * 1. dispatch even to Parent
	 * 2. dispatch event to node via directive
	 * 3. bind the data through a prop
	 */

	import Endpoint from './Endpoint.svelte';
	import Links from './Links.svelte';

	import PointerTracker from '@douganderson444/pointer-tracker';
	import { nanoid } from 'nanoid';

	export let data;
	export let opts = {};

	let canvas;
	let connecting;
	let marker;

	const MARKER = 'marker';
	const DROPZONE = 'dropzone';

	let left = 0;
	let top = 0;

	// get data nodes value from matching node.id
	const getNodeValue = (sourceID, targetID = false) => {
		const match = data.nodes.find((el) => el.id == sourceID);
		if (!match || !match.value) return '';
		if (!targetID) return match.value + ' to';

		const match2 = data.nodes.find((el) => el.id == targetID);
		if (!match2) return match.value;
		return `${match.value} to ${match2.value}`;
	};

	function handler(p, e) {
		e.stopPropagation(); // afftect this event target only, not the ones below it
		e.preventDefault(); // prevents scrolling whilst dragging
		left = p.pageX - canvas.offsetLeft;
		top = p.pageY - canvas.offsetTop;
	}

	function connectable(node, bar) {
		if (!node.id) node.id = nanoid();

		if (!node.dataset['dropzone']) {
			node.dataset.dropzone = true;
		}

		// link from node to marker
		let link;

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
							value: getNodeValue(node.id)
						}
					}
				};

				// Prevent duplicate links
				const check = data.links.find((el) => el.source.id == node.id && el.target.id == MARKER);
				if (check == undefined) data.links = [...data.links, link]; // add latest link
				else data.links = data.links; // simply refresh Svelte UI <Links />
			},
			end: (pointer, event, cancelled) => {
				marker.style.display = 'none'; // so elementFromPoint gets what is underneath instead

				// marker = null;
				connecting = false;

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
								value: getNodeValue(node.id, zone.id)
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
		<Endpoint bind:marker {left} {top} id={MARKER} />
	{/if}

	{#if canvas}
		<slot {connectable} />
	{/if}

	<Links links={data.links} {canvas} {...opts?.links} />
</div>
