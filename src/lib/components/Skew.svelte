<script lang="ts">
	export let color: string = 'pink';

	let green = `before:bg-green-500/50 text-black `;
	let pink = 'before:bg-pink-500 text-white';
</script>

<span
	class="{color == 'pink'
		? pink
		: green} before:inline-block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block"
	><span class="relative pr-1"><slot /></span>
</span>
