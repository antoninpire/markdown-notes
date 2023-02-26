const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Proxima', ...fontFamily.sans]
			},
			colors: {
				background: '#16161a',
				headline: '#fffffe',
				text: '#94a1b2',
				btn: '#514FBE',
				'btn-text': '#fffffe',
				main: '#94a1b2',
				card: '#242629',
				markdown: {
					h1: '#bf616a',
					h2: '#d08770',
					h3: '#ebcb8b',
					h4: '#a3be8c',
					h5: '#b48ead'
				}
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						maxWidth: 'none'
					}
				}
			})
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
