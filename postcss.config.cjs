module.exports = {
	plugins: {
		'postcss-import': {}, // so we can use: <style lang="postcss"> @import '../app.css' </style>
		tailwindcss: {},
		autoprefixer: {}
		// purgecss: purgecss(config) //errors
	}
};
