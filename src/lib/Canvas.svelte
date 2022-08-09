<script>
	import Endpoint from './Endpoint.svelte';
	import Links from './Links.svelte';

	import PointerTracker from '@douganderson444/pointer-tracker';
	import { nanoid } from 'nanoid';

	export let data;

	let canvas;
	let source;
	let marker;

	const MARKER = 'marker';

	let dots = [];
	let left = 0;
	let top = 0;

	function handler(p, e) {
		e.stopPropagation();
		e.preventDefault();
		left = p.clientX - canvas.offsetLeft;
		top = p.clientY - canvas.offsetTop;
	}

	function foo(node, bar) {
		if (!node.id) node.id = nanoid();

		// link from node to marker
		const link = { source: { id: node.id }, target: { id: MARKER } };

		let pointerTracker = new PointerTracker(node, {
			start(pointer, event) {
				// track only 1 pointer at a time
				if (pointerTracker.currentPointers.length === 1) return false;

				marker = Endpoint;
				handler(pointer, event);

				return true;
			},
			move(previousPointers, changedPointers, event) {
				console.log('moving', node.id);

				handler(pointerTracker.currentPointers[0], event);
				// show link
				// 				data.links = [...data.links, link]
			},
			end(pointer, event, cancelled) {
				marker = null;

				// remove temp link
				data.links = data.links
					.map((el) => (el.source.id == node.id && el.target.id == MARKER ? null : el))
					.filter((r) => r);
			},
			avoidPointerEvents: true,
			eventListenerOptions: { capture: true }
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

<div class="my-2 p-2 bg-blue-100 rounded-lg w-fit">
	<a href="https://twitter.com/DougAnderson444" class="font-bold m-2 underline"
		>by @DougAnderson444</a
	>
</div>

<div
	bind:this={canvas}
	class="relative border-dashed border-2 border-sky-500 rounded-lg bg-slate-100 m-4 p-4"
>
	<div class="text-black font-bold">Directive is available within the slot as a slot prop</div>

	{#if marker}
		<div id={MARKER}>
			<svelte:component this={marker} {left} {top} />
		</div>
	{/if}

	{#if canvas}
		<slot directive={foo} />
	{/if}
	<!-- 	{left?.toFixed(0)}, {top?.toFixed(0)} -->
	<Links links={data.links} />
</div>
