/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

function NoSelectedBlockWarning() {
	return <em>{ __( 'Select a block to begin.', 'g-debugger' ) }</em>;
}

export default NoSelectedBlockWarning;
