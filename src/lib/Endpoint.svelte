<script>
	// @ts-nocheck

	export let left;
	export let top;

	let offsetWidth;
	let offsetHeight;

	let dot;
	let rectX = 0;
	let rectY = 0;
	let rect;

	$: x = left - offsetWidth / 2;
	$: y = top - offsetHeight / 2;
</script>

<div
	bind:this={dot}
	class="absolute rounded-full h-16 w-16 bg-green-500 shadow-xl z-20"
	style="left:{x}px; top:{y}px;"
	bind:offsetWidth
	bind:offsetHeight
>
	<div
		class="absolute rounded-full h-32 w-32 shadow-xl z-10"
		style="transform: translate({-offsetWidth / 2}px, {-offsetHeight / 2}px)"
	/>
</div>
