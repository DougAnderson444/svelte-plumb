<script>
	// @ts-nocheck

	// The delegated start point component is on the top right hand side of the parent element
	import { onDestroy } from 'svelte';
	import { DELEGATOR } from './constants.js';

	export let handle; // bind this var to your custom handle
	export let trigger; // passed down from resizable.js

	export let sx = 0; // starting x
	export let sy = 0;
	export let ex = 0; // ending x
	export let ey = 0;
	export let as = 0; // angle start

	let x = 0;
	let y = 0;

	let tracker; // pointer-tracker
	let width;

	$: if (handle && handle?.parentNode) {
		console.log(handle?.parentNode);
		({ width } = handle.parentNode.getBoundingClientRect());
	}

	$: if (width && trigger) {
		x = width; // initialize position to far right corner
		tracker = trigger(handle); // let the directive know what/where the resize handle is
	}

	// update if sy or ey changes
	$: if (handle && as > 0) {
		y = -handle?.offsetHeight; // above if on top
	} else {
		y = 0; // below if on bottom
	}

	// update x offset to the left if sx is on the far left of the handle element
	$: if (handle && !!sy && as < 0.6 && as > -0.6) {
		x = -handle?.offsetWidth;
	} else if (!!sy) {
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
		<!-- {as.toFixed(1) || 0}° -->
	</slot>
</div>
