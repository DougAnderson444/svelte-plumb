<script>
	// @ts-nocheck
	export let position = 'right';
	export let connectable;

	let dot;
	let offsetHeight, offsetWidth, parentHeight;

	let highlight;

	$: if (dot) {
		// ensire parentNdoe of dot is position relative
		// otherwsier, absolute positioning of dot will be relative to the window
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
	class="flex absolute"
	style="top: {top}px;  {position == 'right' ? `right: ${right}px;` : `left: ${left}px;`}"
>
	<div use:connectable class="relative">
		<slot>
			<!-- Default styling of the actual endpoint -->
			<div
				class="flex h-4 w-4 border-2 bg-blue-500 rounded-full border-blue-300 hover:ring hover:ring-blue-800"
			/>
		</slot>
	</div>
</div>
