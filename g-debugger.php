<?php

/*
 * Plugin Name: G Debugger
 * Plugin URI: https://github.com/aduth/g-debugger/
 * Description: Visual debugging tools for block development.
 * Version: 1.0.0
 * Author: Andrew Duthie
 * Author URI: https://andrewduthie.com
 * Text Domain: g-debugger
 */

/**
 * Returns true if currently viewing the block editor, or false otherwise.
 *
 * @return boolean Whether viewing the block editor screen.
 */
function gd_is_block_editor() {
	if ( get_current_screen()->is_block_editor() ) {
		return true;
	}

	// The current screen's `is_block_editor` is intended to be the canonical
	// source, but currently produces a `false` value in the current version of
	// the Gutenberg plugin (4.8). Thus, for compatibility's sake, attempt to
	// use the equivalent Gutenberg function if it's defined.
	if ( function_exists( 'is_gutenberg_page' ) ) {
		return is_gutenberg_page();
	}

	return false;
}

/**
 * Enqueues G Debugger scripts and styles.
 */
function gd_enqueue_scripts() {
	if ( ! gd_is_block_editor() ) {
		return;
	}

	wp_enqueue_script(
		'g-debugger',
		plugins_url( 'g-debugger.js', __FILE__ ),
		array(
			'lodash',
			'wp-components',
			'wp-data',
			'wp-edit-post',
			'wp-element',
			'wp-i18n',
			'wp-plugins',
		),
		'1.0.0'
	);

	wp_set_script_translations( 'g-debugger', 'g-debugger' );

	wp_enqueue_style(
		'g-debugger',
		plugins_url( 'style.css', __FILE__ ),
		array(),
		'1.0.0'
	);
}
add_action( 'admin_enqueue_scripts', 'gd_enqueue_scripts' );
