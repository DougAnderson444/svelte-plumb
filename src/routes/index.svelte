<script>
	// @ts-nocheck

	import { Canvas, Point } from '@douganderson444/svelte-plumb';

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
		links: []
	};
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.3.5/tailwind.min.css"
	/>
</svelte:head>

<div class="my-2 p-2 bg-blue-100 rounded-lg w-fit">
	by <a href="https://twitter.com/DougAnderson444" class="font-bold m-2 underline"
		>@DougAnderson444</a
	>
	<a href="https://twitter.com/DougAnderson444" class="font-bold m-2 underline"
		>https://github.com/DougAnderson444/svelte-plumb</a
	>
</div>

Match the picture to the words:

<Canvas bind:data let:connectable>
	<div class="flex flex-row justify-around ">
		{#each [...Object.entries(types)] as [type, desc], i}
			<div class="flex flex-col border rounded-lg m-4 p-4">
				{#each data.nodes.filter((t) => t.type == type) as node (node.id)}
					<div
						class="block m-2 cursor-pointer select-none w-fit"
						use:connectable
						id={node?.id ? node?.id : null}
					>
						{node.value}
					</div>
				{/each}

				<div class="relative inline-flex m-2 p-4 border rounded-lg">
					We can have an external endpoint, by passing the connectable directive to a connector
					component:
					<Point position={i % 2 ? 'left' : 'right'} {connectable} />
				</div>
			</div>
		{/each}
	</div>
</Canvas>

{JSON.stringify(data)}
