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
			strict: false,
			allow: ['.']
		}
	},
	build: {
		rollupOptions: {
			// https://rollupjs.org/guide/en/#big-list-of-options
			output: {
				minifyInternalExports: false,
				compact: false
			}
		},
		minify: false,
		sourcemap: true,
		optimization: {
			minimize: false
		}
	},
	optimization: {
		minimize: false
	}
};

export default config;
