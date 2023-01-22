<script>
	// @ts-nocheck
	// https://github.com/Rich-Harris/svelte-d3-arc-demo/blob/master/src/Viz.svelte
	// https://github.com/d3/d3-shape/blob/v3.1.0/README.md#_link

	import { onMount } from 'svelte';
	import { getBoxToBoxArrow } from 'perfect-arrows';

	export let link;

	export let strokeColor = link?.strokeColor;
	export let strokeWidth = 1;
	export let arrowColor = 'green';
	export let strokeOpacity = '0.3';
	export let groupStrokeOpacity = '0.1';
	export let groupStrokeColor = 'white';
	export let textStartOffset = 20; // %

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	let d, pointer;
	let options = {};
	let x0, y0, w0, h0, x1, y1, w1, h1;
	let sx, sy, cx, cy, ex, ey, ae, as, ec;

	$: if (link) genArrow(link);

	function genArrow(link) {
		let sourceEl = document.getElementById(link.source.id);
		let targetEl = document.getElementById(link.target.id);
		let canvasEl = document.querySelector(`[data-canvas]`);

		if (!sourceEl || !targetEl) return;

		x0 = getCoords(sourceEl).left - (canvasEl.offsetLeft || 0);
		y0 = getCoords(sourceEl).top - (canvasEl.offsetTop || 0);
		x1 = getCoords(targetEl).left - (canvasEl.offsetLeft || 0);
		y1 = getCoords(targetEl).top - (canvasEl.offsetTop || 0);
		w0 = sourceEl.offsetWidth;
		h0 = sourceEl.offsetHeight;
		w1 = targetEl.offsetWidth;
		h1 = targetEl.offsetHeight;

		const arrow = getBoxToBoxArrow(x0, y0, w0, h0, x1, y1, w1, h1, options);
		[sx, sy, cx, cy, ex, ey, ae, as, ec] = arrow;

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
</script>

{#if link && mounted}
	<g stroke={groupStrokeColor} stroke-opacity={groupStrokeOpacity}>
		<path
			{d}
			id={link.id}
			stroke-width={strokeWidth}
			stroke={strokeColor}
			fill="none"
			stroke-linecap="round"
			stroke-opacity={strokeOpacity}
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
		<slot name="endPoint" {sx} {sy} {ex} {ey}>
			<!-- Default if no named slot endPoint included in Parent component -->
			{#if pointer}
				<!-- Arrow Pointer -->
				<polygon points="0,-6 12,0, 0,6" transform={pointer} fill={arrowColor} />
			{/if}
		</slot>
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
		font-size: 0.75em;
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
