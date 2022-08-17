import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		// postcss: true,
		sourceMap: process.env.NODE_ENV !== 'development',
		postcss: {
			configFilePath: path.resolve(__dirname, './postcss.config.js')
			// ,
			// prependData:
			// 	process.env.NODE_ENV !== 'development'
			// 		? `@import '${path.resolve('./src/utilities.css')}';`
			// 		: ''
		}
	}),

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		prerender: {
			default: true
		},
		paths: {
			// change below to your repo name
			base: '/svelte-plumb' //  process.env.NODE_ENV == 'production' ? '/svelte-plumb' : ''
		}
	}
};

export default config;
