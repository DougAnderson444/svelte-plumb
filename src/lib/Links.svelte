<script>
	// @ts-nocheck

	// https://github.com/Rich-Harris/svelte-d3-arc-demo/blob/master/src/Viz.svelte
	// https://github.com/d3/d3-shape/blob/v3.1.0/README.md#_link
	import { onMount } from 'svelte';
	import { link, curveBumpX } from 'd3-shape';

	export let links;

	export let strokeColor = 'green';
	export let strokeWidth = 3;
	export let arrowColor = 'green';

	export let strokeOpacity = '0.5';

	export let groupStrokeOpacity = '0.1';
	export let groupStrokeColor = 'white';

	export let textStartOffset = '40%';
	export let arrowStartOffset = '60%';

	const generateXcurve = link(curveBumpX);

	let mounted;

	let sourceX, sourceY, targetX, targetY;

	onMount(() => {
		mounted = true;
	});

	function genPath(link) {
		let sourceEl = document.getElementById(link.source.id);
		let targetEl = document.getElementById(link.target.id);

		// centered
		sourceX = sourceEl?.offsetLeft + sourceEl.offsetWidth / 2;
		sourceY = sourceEl?.offsetTop + sourceEl.offsetHeight / 2;
		targetX = targetEl?.offsetLeft + targetEl.offsetWidth / 2;
		targetY = targetEl?.offsetTop + targetEl.offsetHeight / 2;

		let d = generateXcurve({
			source: [sourceX, sourceY],
			target: [targetX, targetY]
		});

		return d;
	}
</script>

{#if mounted}
	<div class="svg-container">
		<svg>
			{#each links as link, i}
				{#if link && mounted}
					<g stroke={groupStrokeColor} stroke-opacity={groupStrokeOpacity}>
						<path
							d={genPath(link)}
							id="link_{i}"
							stroke-width={strokeWidth}
							stroke={strokeColor}
							fill="none"
							stroke-linecap="round"
							marker-mid="url(#triangle)"
							stroke-opacity={strokeOpacity}
						/>
						<text>
							<textPath xlink:href="#link_{i}" startOffset={textStartOffset}>
								<tspan fill="black"
									>{link?.opts?.label?.enabled ? link?.opts?.label?.value : ''}</tspan
								>
							</textPath>
							<textPath xlink:href="#link_{i}" startOffset={arrowStartOffset} fill={arrowColor}
								>{link?.opts ? (link?.opts?.arrow ? '➤' : '') : '➤'}</textPath
							>
						</text>
					</g>
				{/if}
			{/each}
		</svg>
	</div>
{/if}

<style>
	.svg-container {
		/* position: relative;
		top: 0;
		left: 0; */
		width: 100%;
		height: 100%;
	}
	svg {
		position: absolute;
		top: 0;
		left: 0;
		float: left;
		stroke-width: 5;
		border: 1px dashed blue;
		z-index: -1;
		width: 100%;
		height: 100%;
	}

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
