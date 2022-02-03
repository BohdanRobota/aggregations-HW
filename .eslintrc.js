/* eslint-disable */
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 13,
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'prettier'
	],
	'rules': {
		'linebreak-style': [
			'error',
			'unix'
		],
		'prettier/prettier': [
			1,
			{
				trailingComma: 'es5',
				singleQuote: true,
				semi: false,
			},
		],
		...require('eslint-config-prettier').rules
	}
};
