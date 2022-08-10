<script>
	// @ts-nocheck

	export let position = 'right';
	export let connectable;

	let dot;
	let offsetHeight, offsetWidth, parentHeight;

	$: if (dot) {
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
	class="flex absolute h-4 w-4 bg-blue-500 rounded-full border-blue-300 hover:ring hover:ring-blue-800"
	style="top: {top}px;  {position == 'right' ? `right: ${right}px;` : `left: ${left}px;`}"
/>
