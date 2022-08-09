import { sveltekit } from '@sveltejs/kit/vite';
import path, { dirname } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@douganderson444/svelte-plumb': path.resolve('src/lib')
		}
	},
	server: {
		fs: {
			// https://github.com/vitejs/vite/issues/5689
			allow: ['.']
		}
	}
};

export default config;
