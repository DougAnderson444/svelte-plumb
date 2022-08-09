<script>
	// @ts-nocheck

	export let marker;
	export let id;
	export let left;
	export let top;

	let offsetWidth;
	let offsetHeight;

	$: x = left - offsetWidth / 2;
	$: y = top - offsetHeight / 2;
</script>

<div
	bind:this={marker}
	{id}
	class="absolute rounded-full h-16 w-16 bg-green-500 shadow-xl z-20 select-none opacity-50"
	style="left:{x}px; top:{y}px;"
	bind:offsetWidth
	bind:offsetHeight
>
	<div
		class="absolute rounded-full h-32 w-32 shadow-xl z-10 select-none"
		style="transform: translate({-offsetWidth / 2}px, {-offsetHeight / 2}px)"
	>
		<slot />
	</div>
</div>
