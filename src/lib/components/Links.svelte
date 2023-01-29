<script>
	// @ts-nocheck

	// https://github.com/Rich-Harris/svelte-d3-arc-demo/blob/master/src/Viz.svelte
	// https://github.com/d3/d3-shape/blob/v3.1.0/README.md#_link
	import { onMount } from 'svelte';
	import Link from './Link.svelte';

	export let links;
	export let scale;

	// some defaults
	export let strokeColor = 'currentColor';
	export let strokeWidth = 1;
	export let arrowColor = 'currentColor';

	export let strokeOpacity = '0.3';

	export let groupStrokeOpacity = '0.1';
	export let groupStrokeColor = 'white';

	export let textStartOffset = 20; // %

	let mounted;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted && links && links.length > 0}
	<svg style="pointer-events: none; overflow: visible;">
		{#each links as link (link.id)}
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
					{scale}
					on:removeLink
				>
					<svelte:fragment slot="startPoint" let:sx let:sy let:ex let:ey let:as>
						{#if link?.source?.startPoint?.component}
							<!-- foreignObject alows us to put HTML inside an SVG element -->
							<foreignObject
								style:overflow="visible"
								style:position="relative"
								style:pointer-events="auto"
								x={sx}
								y={sy}
								width="1"
								height="1"
							>
								<svelte:component this={link.source.startPoint.component} {sx} {sy} {as} />
							</foreignObject>
						{:else}
							<!-- default to plain circle -->
							<circle cx={sx} cy={sy} r={4} />
						{/if}
					</svelte:fragment>
					<svelte:fragment slot="endPoint" let:sx let:sy let:ex let:ey let:as let:pointer>
						{#if link?.source?.endPoint?.component}
							<!-- foreignObject alows us to put HTML inside an SVG element -->
							<foreignObject
								class="overflow-visible pointer-events-auto relative"
								x={sx}
								y={sy}
								width="1"
								height="1"
							>
								<svelte:component this={link.source.endPoint.component} {sx} {sy} {ex} {ey} {as} />
							</foreignObject>
						{:else}
							<!-- Default if no named slot endPoint included in Parent component -->
							{#if pointer}
								<!-- Arrow Pointer -->
								<polygon points="0,-6 12,0, 0,6" transform={pointer} fill={arrowColor} />
							{/if}
						{/if}
					</svelte:fragment>
				</Link>
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
		pointer-events: stroke;
	}
</style>
