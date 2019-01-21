/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import BlockAttributes from '../block-attributes';
import NoSelectedBlockWarning from '../no-selected-block-warning';

function AttributeInspector( { selectedBlockClientId } ) {
	return (
		<PanelBody
			title={ __( 'Attribute Inspector', 'g-debugger' ) }
			initialOpen
		>
			{ selectedBlockClientId ?
				<BlockAttributes clientId={ selectedBlockClientId } /> :
				<NoSelectedBlockWarning /> }
		</PanelBody>
	);
}

export default withSelect( ( select ) => {
	const { getSelectedBlockClientId } = select( 'core/editor' );

	return {
		selectedBlockClientId: getSelectedBlockClientId(),
	};
} )( AttributeInspector );
