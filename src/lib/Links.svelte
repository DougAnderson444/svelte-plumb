<script>
	// @ts-nocheck

	// https://github.com/Rich-Harris/svelte-d3-arc-demo/blob/master/src/Viz.svelte
	// https://github.com/d3/d3-shape/blob/v3.1.0/README.md#_link
	import { onMount } from 'svelte';
	import Link from './Link.svelte';

	export let links;

	// some defaults
	export let strokeColor = 'currentColor';
	export let strokeWidth = 1;
	export let arrowColor = 'currentColor';

	export let strokeOpacity = '0.3';

	export let groupStrokeOpacity = '0.1';
	export let groupStrokeColor = 'white';

	export let textStartOffset = 20; // %
	export let arrowStartOffset = '40%';

	let mounted;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted && links && links.length > 0}
	<svg style="pointer-events: none;">
		{#each links as link, i}
			{#if link && mounted}
				<Link
					{link}
					{strokeColor}
					{strokeWidth}
					{arrowColor}
					{strokeOpacity}
					{groupStrokeOpacity}
					{groupStrokeColor}
					{textStartOffset}
					{arrowStartOffset}
				/>
			{/if}
		{/each}
	</svg>
{/if}

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		float: left;
		stroke-width: 5;
		/* z-index: -1; */
		width: 100%;
		height: 100%;
	}
</style>
