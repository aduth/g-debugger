/**
 * External dependencies
 */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import { compact } from 'lodash';

/**
 * Whether build should be configured as optimized for production distribution.
 *
 * @type {Boolean}
 */
const isProduction = process.env.NODE_ENV === 'production';

export default {
	input: 'src/index.js',
	external: [
		'@wordpress/components',
		'@wordpress/data',
		'@wordpress/edit-post',
		'@wordpress/element',
		'@wordpress/i18n',
		'@wordpress/plugins',
		'lodash',
		'react',
	],
	output: {
		file: 'g-debugger.js',
		format: 'iife',
		sourcemap: ! isProduction,
		globals: {
			'@wordpress/components': 'wp.components',
			'@wordpress/data': 'wp.data',
			'@wordpress/edit-post': 'wp.editPost',
			'@wordpress/element': 'wp.element',
			'@wordpress/i18n': 'wp.i18n',
			'@wordpress/plugins': 'wp.plugins',
			lodash: 'lodash',
			react: 'React',
		},
	},
	plugins: compact( [
		babel(),
		commonjs(),
		resolve(),
		postcss( {
			extract: 'style.css',
			minimize: isProduction,
		} ),
		isProduction && terser(),
	] ),
};
