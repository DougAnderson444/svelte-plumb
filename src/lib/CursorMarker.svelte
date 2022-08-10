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
	class="absolute"
	style="left:{x}px; top:{y}px;"
	bind:offsetWidth
	bind:offsetHeight
>
	<slot>
		<div class="h-16 w-16 rounded-full bg-green-500 shadow-xl z-20 select-none opacity-50" />
	</slot>
</div>
