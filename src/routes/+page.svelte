<script>
	// @ts-nocheck

	import { Canvas, EndPoint, generateLinkLabel } from '@douganderson444/svelte-plumb';
	import Skew from '$lib/components/Skew.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Delegate from '$lib/components/Delegate.svelte';
	import DemoDelegated from '$lib/components/DemoDelegated.svelte';
	import { pzoom } from '@douganderson444/panzoom-node';
	import { grabable } from '$lib/directives/grabable';

	let types = { emojii: 'emojii', description: 'description' };

	let data = {
		nodes: [
			{ id: 1, type: types.emojii, value: '🐱' },
			{ id: 2, type: types.emojii, value: '🦄' },
			{ id: 3, type: types.emojii, value: '🐐' },
			{ id: 4, type: types.description, value: 'GOAT' },
			{ id: 5, type: types.description, value: 'Cat' },
			{ id: 6, type: types.description, value: 'A very nice Unicorn' },
			{ id: 'absolute1', x: 0, y: 100 }
		],
		links: []
	};

	// set an initial link path
	data.links = [
		{
			id: '2-to-6',
			source: { id: '2' },
			target: { id: '6' },
			opts: { label: { enabled: true, value: generateLinkLabel(data.nodes, '2', '6') } }
		}
	];

	let opts = {
		links: {
			strokeWidth: 1,
			textStartOffset: 20
		}
	};

	let toast = false;
	let scale = 1;

	function handleConnected(e) {
		toast = e.detail.source?.dataset?.value + ' to ' + e.detail.target?.dataset?.value;
		console.log(toast);
	}

	const handleScaleChg = (e) => {
		scale = e.detail.scale;
	};
</script>

<div class="mb-4 ml-4 p-2 w-fit">
	<div class="my-4 p-2 bg-blue-100 rounded-lg w-fit">
		<a href="https://github.com/DougAnderson444/svelte-plumb" class="font-bold m-2 underline"
			>https://github.com/DougAnderson444/svelte-plumb</a
		>
	</div>
	<div class="my-4 p-2 bg-blue-100 rounded-lg w-fit">
		by <a href="https://twitter.com/DougAnderson444" class="font-bold underline">@DougAnderson444</a
		>
	</div>

	Match the picture to the words:
</div>

<div class="relative border-dashed border-2 border-sky-500 rounded-lg bg-slate-100/10 m-4  h-full">
	<div use:pzoom={{ panAnywhere: true }} on:scale={handleScaleChg}>
		<Canvas bind:data {opts} {scale} let:connectable on:connected={handleConnected}>
			<div class="border border-red-500">
				<div class="text-black font-bold m-4">
					Directive is available within the slot as a slot prop.<br />
					Try scroll to zoom, drag to pan, and still connect!
				</div>

				<div class="flex flex-row justify-around ">
					{#each [...Object.entries(types)] as [type, desc], i}
						<div class="flex flex-col border rounded-lg m-4 p-4 items-center">
							{#each data.nodes.filter((t) => t.type == type) as node (node.id)}
								<div
									class="block m-2 cursor-pointer select-none w-fit"
									use:connectable={{ dataset: { value: node.value } }}
									data-no-pan
									id={node?.id ? node?.id : null}
								>
									{node.value}
								</div>
							{/each}
						</div>
					{/each}
				</div>

				<div class="relative flex flex-row justify-around ">
					<div
						class="flex flex-col border rounded-lg m-4 p-4 items-center"
						use:connectable={{ startPoint: { component: DemoDelegated, show: true } }}
						use:grabable={{ nodeData: { id: 'absolute1' }, scale: scale }}
						on:move={(e) => {
							// set data.nodes where node.id == e.detail.id
							data.nodes.find((n) => n.id == 'absolute1').x = e.detail.x;
							data.nodes.find((n) => n.id == 'absolute1').y = e.detail.y;
							data = data;
						}}
						on:end={(e) => {
							data.nodes.find((n) => n.id == 'absolute1').x = e.detail.x;
							data.nodes.find((n) => n.id == 'absolute1').y = e.detail.y;
							data = data;
						}}
						style="
                position: absolute;
				user-select: none;
				box-shadow: 10px 5px 5px black;
                width: 250px;
				height: 100px;
				left: {data.nodes.find((n) => n.id == 'absolute1')?.x || 0}px;
                top: {data.nodes.find((n) => n.id == 'absolute1')?.y || 0}px;
				--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
				--tw-ring-offset-shadow: 0 0 #0000;
				--tw-ring-shadow: 0 0 #0000;
				--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
				box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
				"
					>
						<div class="block m-2 select-none w-fit">
							Delegated Floating <br />Label Components<br />
							Connect then move me, then scroll!
						</div>
					</div>
					<div
						class="flex flex-col border rounded-lg m-4 p-4 items-center"
						use:connectable
						id={'To'}
					>
						<div class="block m-2 cursor-pointer select-none w-fit">
							...Starts out fixed, then switches to<br /> movable endpoint once connected.
						</div>
					</div>
				</div>

				<div
					class="flex flex-row flex-wrap border rounded-lg mt-20 m-4 p-4 justify-between bg-neutral-50"
				>
					<div class="inline-flex m-2 p-4 border rounded-lg w-1/3 bg-amber-100">
						Can we also have an external endpoint?
						<EndPoint position={'right'} {connectable} />
						<EndPoint position={'left'} {connectable} />
					</div>
					<div class="relative inline-flex m-2 p-4 border rounded-lg w-1/3 bg-red-300">
						No, libraries cannot do that. Just kidding.
						<EndPoint position={'left'} {connectable} />
					</div>
					<div class="relative flex-0 m-2 ml-auto p-4 border rounded-lg  w-1/3 bg-green-300">
						Yes, pass the connectable directive to the component. They can even be <Skew
							>custom</Skew
						>, like this one.
						<EndPoint position={'left'} {connectable}>
							<div
								class="h-4 w-4 bg-white rounded-full border-4 border-black hover:ring hover:ring-green-800"
							/>
						</EndPoint>
					</div>
				</div>
			</div>
			<!-- Optional -->
			<!-- Default cursor indicator marker below can be overriden in Parent Component slot -->
			<div
				slot="marker"
				class="h-4 w-4 md:h-16 md:w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[1em] md:border-[1em]"
			/>

			{#if toast}
				{#key toast}
					<Toast bind:toast>
						{toast}
					</Toast>
				{/key}
			{/if}
		</Canvas>
	</div>
</div>

<!-- Control Panel for Links -->

<div class="m-4 p-4 bg-slate-100 rounded-lg shadow-lg border">
	<div class="text-lg font-bold underline">Control Panel</div>
	<div class="my-4 p-4 bg-blue-200/50 rounded-lg shadow">
		<label class=""
			><span class="p-2">Stroke Width</span>
			<input type="range" bind:value={opts.links.strokeWidth} min="1" max="50" />
		</label>
	</div>
	<div class="my-4 p-4 bg-blue-200/50 rounded-lg shadow">
		<label class=""
			><span class="p-2">Stroke Opacity</span>
			<input type="range" bind:value={opts.links.strokeOpacity} min="0.1" max="1" step="0.1" />
		</label>
	</div>
	<div class="my-4 p-4 bg-blue-200/50 rounded-lg shadow">
		<label class=""
			><span class="p-2">Start Distance {opts.links.textStartOffset}</span>
			<input type="range" bind:value={opts.links.textStartOffset} min="0%" max="90%" step="5%" />
		</label>
	</div>
</div>

<pre>
	{JSON.stringify({ data }, null, 2)}
</pre>
