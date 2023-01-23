<svelte:options accessors={true} />

<script>
	// @ts-nocheck

	// The delegated start point component is on the top right hand side of the parent element
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { DROPZONE } from './constants.js';

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

	let tracker; // pointer-tracker
	let width;

	$: if (mounted && handle && handle?.parentNode) {
		// console.log(handle?.parentNode, `[data-${DROPZONE}]`, handle?.closest(`[data-${DROPZONE}]`));
		({ width } = handle.parentNode.getBoundingClientRect());
		x = width; // initialize position to far right corner
		dispatch('ready', { handle }); // let the parent know we're ready to track
	}

	// update if sy or ey changes
	$: if (handle && as > 0) {
		y = -handle?.offsetHeight; // above if on top
	} else {
		y = 0; // below if on bottom
	}

	// update x offset to the left if sx is on the far left of the handle element
	$: if (handle && (!!sy || !!sx) && as < 0.6 && as > -0.6) {
		x = -handle?.offsetWidth;
	} else if (!!sy || !!sx) {
		x = 0;
	}

	onDestroy(() => {
		tracker?.stop(); // stop tracking pointer movements, save memory
	});
</script>

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
