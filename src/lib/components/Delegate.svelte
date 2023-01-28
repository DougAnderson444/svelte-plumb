<svelte:options accessors={true} />

<script>
	// @ts-nocheck

	// The delegated start point component is on the top right hand side of the parent element
	import { createEventDispatcher } from 'svelte';

	export let sx; // starting x
	export let sy;
	// export let ex = 0; // ending x
	// export let ey = 0;
	export let as; // angle start

	export let mounted = false;
	export let show = true; // boolean toggle whether to show the resizer handle or not

	let handle; // bind this var to your custom handle

	const dispatch = createEventDispatcher();

	let x = 0;
	let y = 0;

	$: if (mounted && handle && handle?.parentNode?.offsetWidth) {
		x = handle?.parentNode.offsetWidth; // initialize position to far right corner
		dispatch('ready', { handle }); // let the parent know we're ready to track
	}

	$: y = handle && as > 0 ? -handle?.offsetHeight : 0; // above if on top
	$: if (handle && !!as) {
		x = as < 0.6 && as > -0.6 ? -handle?.offsetWidth : 0;
	}
</script>

{#if show}
	<div
		bind:this={handle}
		class="cursor-pointer select-none font-mono p-1 text-neutral-400 text-sm bg-white/50 z-50"
		style="position: absolute; left:{x}px; top:{y}px;"
	>
		<slot
			>Connect
			<!-- {as.toFixed(1) || 0}° @ {x.toFixed(0)}, {y.toFixed(0)} -->
		</slot>
	</div>
{/if}
