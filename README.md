# Svelte Plumb

Experimental Work In Progress.

Going for the simplest svg drawing API _ever_.

![Demo](static/thumb.png)

## The Problem

Most javascript diagram libraries use SVGs for non-line / connectors. This is silly, we have HTML for that. This library explores making js diagramming a bit more simple to program and use as a library.

Also, frameworks like js-plumb are a bit complex to use, the setup is a bit much so this is an attempt to simplify it using Svelte's API.

## Solution: One Parent Component + One Action directive

The bare minimum is a framework Component wrapper (in this case, Svelte) because:

1. SVG lines need to be drawn relative to common, fixed coords (ie. the Parent)
2. We need a Parent component to be able to use helper components (like the "Connecting..." HTML div, which is also written in Svelte). Without a Parent component (for instance, if you chose to [use action directives](https://svelte.dev/docs#template-syntax-element-directives-use-action) exclusively), you wouldn't be able to use Svelte's slick API, and life would be hard.
3. In order to have `position: absolute` SVGs, we need a Parent to be `positioned: relative`. Need a parent component for this too... if it didn't exist, well, you'd have to make an HTML version of it. So why not use the component framework and kee life simply and easy.

QED, as my high school math teacher would say.

## API

```svelte
import {(Canvas, EndPoint)} from '@douganderson444/svelte-plumb';

<Canvas bind:data let:connectable>
	<div use:connectable>This HTMLElement is now connectable for drag and drop</div>

	<!-- OPTIONS -->
	<!-- Styles are Tailwindcss shortcuts, but regular css works too -->

	<!-- OPTION, override connecting marker, with `slot="marker"` -->
	<div
		slot="marker"
		class="h-16 w-16 p-8 rounded-full bg-pink-500 shadow-xl opacity-50 select-none border-[2em]"
	/>

	<!-- OPTION, use connector end points  -->
	<div>
		We also add endpoints outside the element.
		<EndPoint position={'right'} {connectable} />
		<EndPoint position={'left'} {connectable} />
	</div>

	<!-- OPTION, style your endpoint -->
	<div>
		I like my endpoints like I like my donuts.
		<EndPoint position={'left'} {connectable}>
			<div
				class="h-4 w-4 bg-white rounded-full border-4 border-black hover:ring hover:ring-green-800"
			/>
		</EndPoint>
	</div>
</Canvas>
```

So, anything within the Canvas component with a `use:connectable` action directive will be connectable. The SVG lines will be drawn relative to the Canvas component, and away you go. Everything else is done behind the scenes by Svelte.

# REPO Demo

`npm run dev`

# REPL Demo

https://svelte.dev/repl/cf05fb3c64674978a717ce1f861a82c0?version=3.49.0

# Inspiration

[https://demo.jsplumbtoolkit.com/flowchart-builder/](https://demo.jsplumbtoolkit.com/flowchart-builder/)
[https://github.com/bpmn-io/diagram-js](https://github.com/bpmn-io/diagram-js)

CSS by [https://tailwindcss.com/](https://tailwindcss.com/)
