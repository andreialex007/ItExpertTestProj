export default {
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindConfig: './tailwind.config.js',
	singleQuote: true,
	bracketSpacing: true,
	jsxBracketSameLine: false,
	printWidth: 150,
	tabWidth: 4,
	useTabs: true,
	overrides: [
		{
			files: ['*.yml'],
			options: {
				singleQuote: false,
			},
		},
	],
};
