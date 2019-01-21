/**
 * External dependencies
 */
import { map } from 'lodash';
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './style.css';
import BlockAttributesValue from './value';

function BlockAttributes( { attributes, schema } ) {
	return (
		<dl>
			{ map( schema, ( definition, name ) => {
				const value = attributes[ name ];
				const isDefault = definition.default === value;

				return (
					<Fragment key={ name }>
						<dt
							className={
								clsx( 'gd-block-attributes__attribute-name', {
									'is-default': isDefault,
								} )
							}
						>
							{ name }
						</dt>
						<dd className="gd-block-attributes__attribute-value">
							<pre>
								<code>
									<BlockAttributesValue value={ value } />
								</code>
							</pre>
						</dd>
					</Fragment>
				);
			} ) }
		</dl>
	);
}

export default withSelect( ( select, ownProps ) => {
	const { clientId } = ownProps;
	const { getBlockType } = select( 'core/blocks' );
	const { getBlockName, getBlockAttributes } = select( 'core/editor' );

	const blockType = getBlockType( getBlockName( clientId ) );
	if ( blockType ) {
		return {
			schema: blockType.attributes,
			attributes: getBlockAttributes( clientId ),
		};
	}
} )( BlockAttributes );
