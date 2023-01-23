<svelte:options accessors={true} />

<script>
	import Delegate from './Delegate.svelte';
	export let mounted = false;
	export let as = 0; // pass angle start if your Component depends on the angle of the arrow
	export let sx = 0; // adjust label left/right of the Component
	export let sy = 0;
</script>

<Delegate {mounted} {as} {sx} {sy} on:ready>Connect Me</Delegate>
