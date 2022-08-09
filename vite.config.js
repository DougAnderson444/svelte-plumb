import { sveltekit } from '@sveltejs/kit/vite';
import path, { dirname } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@douganderson444/svelte-plumb': path.resolve('src/lib')
		}
	}
};

export default config;
