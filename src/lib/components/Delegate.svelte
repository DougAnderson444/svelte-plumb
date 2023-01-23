<svelte:options accessors={true} />

<script>
	// @ts-nocheck

	// The delegated start point component is on the top right hand side of the parent element
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { DROPZONE } from '$lib/constants.js';

	export let sx = 0; // starting x
	export let sy = 0;
	export let ex = 0; // ending x
	export let ey = 0;
	export let as = 0; // angle start

	export let mounted = false;

	let handle; // bind this var to your custom handle

	const dispatch = createEventDispatcher();

	let x = 0;
	let y = 0;

	$: if (mounted && handle && handle?.offsetWidth) {
		// console.log(handle?.parentNode, `[data-${DROPZONE}]`, handle?.closest(`[data-${DROPZONE}]`));
		x = -handle?.offsetWidth; // initialize position to far right corner
		dispatch('ready', { handle }); // let the parent know we're ready to track
	}

	$: y = handle && as > 0 ? -handle?.offsetHeight : 0; // above if on top
	$: x = handle && (!!sy || !!sx) && as < 0.6 && as > -0.6 ? 0 : -handle?.offsetWidth;
</script>

<div
	bind:this={handle}
	class="cursor-pointer select-none font-mono p-1 text-neutral-400 text-sm bg-white/50 z-50"
	style="position: absolute; right:{x}px; top:{y}px;"
>
	<slot
		>Connect
		<!-- {as.toFixed(1) || 0}° @ {x.toFixed(0)}, {y.toFixed(0)} -->
	</slot>
</div>
