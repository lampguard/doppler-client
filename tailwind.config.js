/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			articulat: ['Articulat', 'ui-sans-serif', 'sans-serif'],
			'articulat-bold': ['ArticulatBold', 'ui-sans-serif', 'sans-serif'],
			'articulat-light': ['ArticulatLight', 'ui-sans-serif', 'sans-serif'],
			'articulat-oblique': ['ArticulatOblique', 'ui-sans-serif', 'sans-serif'],
		},
		animation: {
			'unroll': 'unroll .2s linear forwards'
		},
		keyframes: {
			unroll: {
				from: { width: 0 },
				to: { width: '100%' },
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: ['light'],
	},
};
