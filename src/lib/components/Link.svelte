<script>
	// @ts-nocheck
	// https://github.com/Rich-Harris/svelte-d3-arc-demo/blob/master/src/Viz.svelte
	// https://github.com/d3/d3-shape/blob/v3.1.0/README.md#_link

	import { onMount, createEventDispatcher } from 'svelte';
	import { getBoxToBoxArrow } from 'perfect-arrows';
	import { tweened } from 'svelte/motion';
	import { clickOutside } from '../directives/clickOutside';

	export let link;
	export let scale;

	export let strokeColor = link?.strokeColor;
	export let strokeWidth = 1;
	export let arrowColor = 'green';
	export let strokeOpacity = '0.3';
	export let groupStrokeOpacity = '0.1';
	export let groupStrokeColor = 'white';
	export let textStartOffset = 20; // %

	const dispatch = createEventDispatcher();

	let initialStrokeWidth = strokeWidth;

	let stroke;
	let selected = false;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	let d, pointer;
	let options = {
		bow: 0.05,
		stretch: 0.5,
		stretchMin: 10,
		stretchMax: 200,
		padStart: 0,
		padEnd: 15,
		flip: false,
		straights: true
	};
	let x0, y0, w0, h0, x1, y1, w1, h1;
	let sx, sy, cx, cy, ex, ey, ae, as, ac;

	$: if (link) genArrow(link);

	function genArrow(link) {
		let sourceEl = document.getElementById(link.source.id);
		let targetEl = document.getElementById(link.target.id);
		// get closest data-canvas to source and target
		let canvasEl = sourceEl.closest('[data-canvas]');

		if (!sourceEl || !targetEl) return;

		let source = getCoords(sourceEl);
		let target = getCoords(targetEl);
		let canvas = getCoords(canvasEl);

		x0 = (source.left - canvas.left) / scale;
		y0 = (source.top - canvas.top) / scale;
		x1 = (target.left - canvas.left) / scale;
		y1 = (target.top - canvas.top) / scale;

		w0 = (source.right - source.left) / scale;
		h0 = (source.bottom - source.top) / scale;
		w1 = (target.right - target.left) / scale;
		h1 = (target.bottom - target.top) / scale;

		const arrow = getBoxToBoxArrow(x0, y0, w0, h0, x1, y1, w1, h1, options);
		[sx, sy, cx, cy, ex, ey, ae, as, ac] = arrow;

		d = `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
		let endAngleAsDegrees = ae * (180 / Math.PI);
		pointer = `translate(${ex},${ey}) rotate(${endAngleAsDegrees})`;
	}

	// Get document coordinates of an element
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();

		return {
			top: box.top + window.pageYOffset,
			right: box.right + window.pageXOffset,
			bottom: box.bottom + window.pageYOffset,
			left: box.left + window.pageXOffset
		};
	}
	function handleMouseOver(e) {
		selected = true;
		strokeWidth = initialStrokeWidth * 20; // jump
	}
	function handleMouseOut(e) {
		stroke = tweened(strokeWidth, {
			duration: 1000
		});
		$stroke = initialStrokeWidth; // shrink
	}

	function handleUnselect(e) {
		selected = false;
	}

	$: if ($stroke > initialStrokeWidth) {
		strokeWidth = $stroke;
	}
</script>

{#if link && mounted}
	<g stroke={groupStrokeColor} stroke-opacity={groupStrokeOpacity}>
		<path
			style="pointer-events: stroke; user-select: none; outline: none;"
			{d}
			id={link.id}
			stroke-width={strokeWidth}
			stroke={strokeColor}
			fill="none"
			stroke-linecap="round"
			stroke-opacity={strokeOpacity}
			stroke-dasharray="4"
			on:click={() => (selected = !selected)}
			on:keypress={() => (selected = !selected)}
			on:mouseover={handleMouseOver}
			on:mouseout={handleMouseOut}
			on:focus={handleMouseOver}
			on:blur={handleMouseOut}
			use:clickOutside={{ enabled: selected, handleUnselect }}
      role="link"
      tabindex="0"
		/>
		<!-- Always have text left to right (English) -->
		{#if sx < ex}
			<text>
				<textPath xlink:href="#{link.id}" startOffset={textStartOffset + '%'}>
					<tspan fill="black">{link?.opts?.label?.enabled ? link?.opts?.label?.value : ''}</tspan>
				</textPath>
			</text>
		{:else}
			<text x={cx} y={cy}>
				<tspan fill="black">{link?.opts?.label?.enabled ? link?.opts?.label?.value : ''}</tspan>
			</text>
		{/if}
		<!-- Optional endpoint Components -->
		<slot name="startPoint" {sx} {sy} {ex} {ey} {as}>
			<!-- default to plain circle -->
			<circle cx={sx} cy={sy} r={4} />
		</slot>
		<slot name="endPoint" {sx} {sy} {ex} {ey} {pointer}>
			<!-- Default if no named slot endPoint included in Parent component -->
			{#if pointer}
				<!-- Arrow Pointer -->
				<polygon points="0,-6 12,0, 0,6" transform={pointer} fill={arrowColor} />
			{/if}
		</slot>
		{#if selected}
			<!-- Draw an unfilled svg circle -->
			<circle cx={ex} cy={ey} r={12} fill="none" stroke="blue" />
			<!-- Draw a red delete "x" at cx, cy with stroke opacity 0.6-->
			<foreignObject
				style="overflow: visible; pointer-events: auto; position: relative;"
				x={cx}
				y={cy}
				width="1"
				height="1"
				><slot name="deleteButton">
					<button
						on:click={() => dispatch('removeLink', link.id)}
						style="font-family: 'Luckiest Guy'; width: fit-content; height: fit-content;
					color: rgb(239 68 68); font-size: 1.5em; user-select: none; outline: none;"
						style:transform="translate(180deg)"
					>
						X
					</button>
				</slot>
			</foreignObject>
		{/if}
	</g>
{/if}

<style>
	text {
		font-family: arrows;
		font-size: 1.5em;
		fill: grey;
		dominant-baseline: central;
	}

	tspan {
		font-family: 'Luckiest Guy', cursive;
		font-size: 0.5em;
		/* font-family: Impact; */
		dominant-baseline: ideographic;
	}

	/* @font-face {
		font-family: arrows;
		src: url(arrows.woff);
	} */

	@font-face {
		font-family: 'Luckiest Guy';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/luckiestguy/v17/_gP_1RrxsjcxVyin9l9n_j2hTd52.woff2)
			format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
</style>
