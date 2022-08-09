<script>
	// @ts-nocheck

	import { Canvas } from '@douganderson444/svelte-plumb';

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

<Canvas bind:data let:directive>
	<div class="flex flex-row">
		{#each [...Object.entries(types)] as [type, desc]}
			<div class="flex flex-col border rounded-lg m-4 p-4">
				{#each data.nodes.filter((t) => t.type == type) as node (node.id)}
					<div class="block m-2 cursor-pointer select-none" use:directive>
						{node.value}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</Canvas>
