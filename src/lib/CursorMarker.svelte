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
		<div
			class="h-4 w-4 p-8 rounded-full shadow-xl opacity-80 select-none border-[2em] border-pink-500/50"
		/>
	</slot>
</div>
