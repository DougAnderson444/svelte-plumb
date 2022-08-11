<script>
	// @ts-nocheck

	import { Canvas, EndPoint } from '@douganderson444/svelte-plumb';

	import Skew from '$lib/Skew.svelte';

	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let types = { emojii: 'emojii', description: 'description' };

	let data = {
		nodes: [
			{ id: 1, type: types.emojii, value: '🐱' },
			{ id: 2, type: types.emojii, value: '🦄' },
			{ id: 3, type: types.emojii, value: '🐐' },
			{ id: 4, type: types.description, value: 'GOAT' },
			{ id: 5, type: types.description, value: 'Cat' },
			{ id: 6, type: types.description, value: 'Unicorn' }
		],
		links: [
			{
				id: '2-to-6',
				source: { id: '2' },
				target: { id: '6' },
				opts: { label: { enabled: true, value: '🦄 to Unicorn' } }
			}
		]
	};

	let opts = {
		links: {
			strokeWidth: 18,
			textStartOffset: 40
		}
	};
</script>

<div class="my-2 p-2 bg-blue-100 rounded-lg w-fit">
	by <a href="https://twitter.com/DougAnderson444" class="font-bold m-2 underline"
		>@DougAnderson444</a
	>
	<a href="https://github.com/DougAnderson444/svelte-plumb" class="font-bold m-2 underline"
		>https://github.com/DougAnderson444/svelte-plumb</a
	>
</div>

Match the picture to the words:

<Canvas bind:data bind:opts let:connectable>
	<div class="flex flex-row justify-around ">
		{#each [...Object.entries(types)] as [type, desc], i}
			<div class="flex flex-col border rounded-lg m-4 p-4 items-center">
				{#each data.nodes.filter((t) => t.type == type) as node (node.id)}
					<div
						class="block m-2 cursor-pointer select-none w-fit"
						use:connectable
						id={node?.id ? node?.id : null}
					>
						{node.value}
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<div class="flex flex-row flex-wrap border rounded-lg m-4 p-4 justify-between bg-neutral-50">
		<div class="inline-flex m-2 p-4 border rounded-lg w-1/3 bg-amber-100">
			Can we also have an external endpoint?
			<EndPoint position={'right'} {connectable} />
			<EndPoint position={'left'} {connectable} />
		</div>
		<div class="relative inline-flex m-2 p-4 border rounded-lg w-1/3 bg-red-300">
			No, libraries cannot do that. Just kidding.
			<EndPoint position={'left'} {connectable} />
		</div>
		<div class="relative flex-0 m-2 ml-auto p-4 border rounded-lg  w-1/3 bg-green-300">
			Yes, pass the connectable directive to the component. They can even be <Skew>custom</Skew>,
			like this one.
			<EndPoint position={'left'} {connectable}>
				<div
					class="h-4 w-4 bg-white rounded-full border-4 border-black hover:ring hover:ring-green-800"
				/>
			</EndPoint>
		</div>
	</div>

	<!-- Optional -->
	<!-- Default cursor indicator marker below can be overriden in Parent Component slot -->
	<div
		slot="marker"
		class="h-16 w-16 p-8 rounded-full bg-pink-500 shadow-xl opacity-50 select-none border-[2em]"
	/>
</Canvas>

<!-- Control Panel for Links -->

<div class="m-4 p-4 bg-slate-100 rounded-lg shadow-lg border">
	<div class="text-lg font-bold underline">Control Panel</div>
	<div class="my-4 p-4 bg-blue-200/50 rounded-lg shadow">
		<label class=""
			><span class="p-2">Stroke Width</span>
			<input type="range" bind:value={opts.links.strokeWidth} min="1" max="50" />
		</label>
	</div>
	<div class="my-4 p-4 bg-blue-200/50 rounded-lg shadow">
		<label class=""
			><span class="p-2">Stroke Opacity</span>
			<input type="range" bind:value={opts.links.strokeOpacity} min="0.1" max="1" step="0.1" />
		</label>
	</div>
	<div class="my-4 p-4 bg-blue-200/50 rounded-lg shadow">
		<label class=""
			><span class="p-2">Start Distance {opts.links.textStartOffset}</span>
			<input type="range" bind:value={opts.links.textStartOffset} min="0%" max="90%" step="5%" />
		</label>
	</div>
</div>

<!-- {JSON.stringify({ data })} -->
