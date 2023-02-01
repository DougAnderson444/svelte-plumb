<svelte:options accessors={true} />

<script>
	// @ts-nocheck

	// The delegated start point component is on the top right hand side of the parent element
	import { createEventDispatcher } from 'svelte';

	// export let sx; // starting x
	// export let sy; // starting y
	// export let ex = 0; // ending x
	// export let ey = 0;
	export let as; // angle start

	export let mounted = false;
	export let show = true; // boolean toggle whether to show the resizer handle or not

	let handle; // bind this var to your custom handle
	let offsetWidth;

	const dispatch = createEventDispatcher();

	let x = 0;
	let y = 0;

	$: if (mounted && handle && handle?.parentNode?.offsetWidth) {
		x = handle?.parentNode.offsetWidth; // initialize position to far right corner
		dispatch('ready', { handle }); // let the parent know we're ready to track
	}

	$: y = handle && as > 0 ? -handle?.offsetHeight : 0; // above if on top
	$: if (handle && handle.style && !!as) {
		if (as < 0.6 && as > -0.6) {
			handle.style.transform = `translate(-100%, 0)`;
			handle.style.right = null;
		} else {
			handle.style.transform = null;
		}
	}
</script>

{#if show}
	<div
		bind:this={handle}
		bind:offsetWidth
		style="position: absolute; right: 0px; top:{y}px; user-select: none; cursor: pointer; font-family: monospace; padding: 0.25rem"
	>
		<slot
			>Connect→
			<!-- {as.toFixed(1) || 0}° @ {x.toFixed(0)}, {y.toFixed(0)} -->
		</slot>
	</div>
{/if}
