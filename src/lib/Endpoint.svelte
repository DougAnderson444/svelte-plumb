<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	export let position = 'right';
	export let connectable;
	export let zoneSize = 2;

	let dot;
	let offsetHeight, offsetWidth, parentHeight;

	let highlight;

	$: if (dot) {
		// ensire parentNdoe of dot is position relative
		dot.parentNode.style.position = 'relative';

		parentHeight = dot.parentNode.offsetHeight;
		// parentHeight = dot.parentNode.getBoundingClientRect().height;
	}

	$: top = parentHeight && offsetHeight ? parentHeight / 2 - offsetHeight / 2 : 0;
	$: right = offsetWidth ? -offsetWidth / 2 : 0;
	$: left = offsetWidth ? -offsetWidth / 2 : 0;
</script>

<svelte:window
	on:resize={(e) => {
		top = top;
		left = left;
		right = right;
	}}
/>

<div
	bind:this={dot}
	bind:offsetWidth
	bind:offsetHeight
	use:connectable
	class="flex absolute border-[{zoneSize}em] hover:border-red-500/50 border-transparent rounded-full"
	style="top: {top}px;  {position == 'right' ? `right: ${right}px;` : `left: ${left}px;`}"
>
	<slot>
		<div
			class="flex h-4 w-4 border-2 bg-blue-500 rounded-full border-blue-300 hover:ring hover:ring-blue-800"
		/>
	</slot>
</div>
