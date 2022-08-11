<script>
	// @ts-nocheck

	export let node;
	export let zoneSize = '2em';
	export let highlight = false; // export makes it possible to set externally from the touch listener

	let dot;

	// OVERLAY on center of parent node
	$: top = dot ? -dot.offsetHeight / 2 + node.offsetHeight / 2 : 0;
	$: left = dot ? -dot.offsetWidth / 2 + node.offsetWidth / 2 : 0;

	// move the dot underneath the node its highlighting in the DOM, so events bubble easily
	$: if (dot) node.insertAdjacentElement('beforeend', dot);

	// if node has a z-index, set dot z-index minus one so it's below the node, if node has no z-index, set it to 2
	// $: if (dot) dot.style.zIndex = node.style.zIndex - 1;
</script>

<svelte:window
	on:resize={(e) => {
		top = top;
		left = left;
	}}
/>

<!-- Need to get the position of the node that was passed in
    then set this style to same as node -->

<div
	id={node.id + '--highlighter'}
	data-highlighter="true"
	class="absolute border-[{zoneSize}] border-transparent rounded-full p-0 m-0 "
	style="top: {top}px; left: {left}px;"
	bind:this={dot}
	on:mouseover={(e) => {
		highlight = true; // actually this is redundant because overHighlighter in Canvas.svelte, but it's here for clarity
	}}
	on:mouseleave={(e) => {
		highlight = false;
	}}
	on:focus={(e) => {
		highlight = true;
	}}
	on:blur={(e) => {
		highlight = false;
	}}
>
	{#if highlight}
		<slot>
			<div
				style="transform: translate(-50%, -50%);"
				class="absolute border-[{zoneSize}] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full"
			/>
		</slot>
	{/if}
</div>
