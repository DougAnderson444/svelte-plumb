# Svelte Plumb

Experimental Work In Progress. Going for the simplest svg drawing API _ever_.

![Demo](static/thumb.png)

## Problem

Most javascript diagram libraries use SVGs for non-line / connectors. This is silly, we have HTML for that. This library explores making js diagramming a bit more simple to program and use as a library.

Also, frameworks like js-plumb are a bit complex to use, the setup is a bit much so this is an attempt to simplify it using Svelte's API.

## Solution: One Parent Component + One Action directive

The bare minimum is a framework Component wrapper (in this case, Svelte) because

1. the SVG lines need to be drawn relative to common, fixed coords
2. you need a Parent component to be able to use helper components (like the "Connecting..." HTML div, which is also written in Svelte). Without a Parent component (for instance, if you chose to use actio directives exclusively), you wouldn't be able to use Svelte's slick API ad life would be hard.
3. the wrapper needs to be positioned: relative for child to be position: absolute. Need a parent component for this too... if it didn't exist, well, you'd have to make an HTML version of it. So why not use the component framework and kee life simply and easy.

```svelte
<Canvas let:connectable>
	<div use:connectable>Svelte action directive now applied to this HTMLElement</div>

	<div use:connectable on:connect={handleConnect}>
		Svelte action directive now applied to this HTMLElement
	</div>
</Canvas>
```

# REPO Demo

`npm run dev`

# REPL Demo

https://svelte.dev/repl/cf05fb3c64674978a717ce1f861a82c0?version=3.49.0

# Inspiration

[https://demo.jsplumbtoolkit.com/flowchart-builder/](https://demo.jsplumbtoolkit.com/flowchart-builder/)
[https://github.com/bpmn-io/diagram-js](https://github.com/bpmn-io/diagram-js)
