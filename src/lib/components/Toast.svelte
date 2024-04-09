<script lang="ts">
	// @ts-nocheck
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Export a prop through which you can set a desired transition
	let transition: TransitionTypes = 'fade';
	// Pass in extra transition params
	export let toast = true;

	let visible = true;

	const colors = {
		blue: 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200',
		green: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
		red: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
		gray: 'text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-200',
		purple: 'text-purple-500 bg-purple-100 dark:bg-purple-800 dark:text-purple-200',
		indigo: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-200',
		yellow: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200'
	};

	let counter = 3;

	$: if (toast) {
		counter = 3;
		timeout();
	}

	function timeout() {
		if (--counter > 0) return setTimeout(timeout, 1000);
		visible = false;
	}
</script>

{#if visible}
	<div
		transition:fly={{ delay: 100, duration: 800, x: 0, y: -200, opacity: 0.1, easing: quintOut }}
		class="flex flex-col items-center fixed top-0 left-0 m-4 w-5/6 p-4 text-neutral-800 bg-transparent"
	>
		<div
			class="flex-1 flex max-w-fit items-center py-4 px-8 bg-yellow-300/90 rounded-lg shadow-2xl drop-shadow-2xl"
		>
			<div class="text-lg font-normal w-full">
				<slot />
				<span class="opacity-40">{counter}s</span>
				<slot name="extra" />
			</div>
		</div>
	</div>
{/if}

<style lang="postcss"></style>
