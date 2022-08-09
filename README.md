# Svelte Plumb

Experimental Work In Progress. Going for the simplest svg drawing API _ever_.

```svelte
<Canvas let:connectable>
	<div use:connectable>Svelte action directive now applied to this HTMLElement</div>

	<div use:connectable>Svelte action directive now applied to this HTMLElement</div>
</Canvas>
```

# REPO Demo

`npm run dev`

# REPL Demo

https://svelte.dev/repl/cf05fb3c64674978a717ce1f861a82c0?version=3.49.0

# Inspiration

[https://demo.jsplumbtoolkit.com/flowchart-builder/](https://demo.jsplumbtoolkit.com/flowchart-builder/)
[https://github.com/bpmn-io/diagram-js](https://github.com/bpmn-io/diagram-js)
