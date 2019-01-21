/**
 * External dependencies
 */
import { repeat, forEach, isObjectLike } from 'lodash';

function BlockAttributesValue( { value, indent = 0 } ) {
	const prefix = '\n' + repeat( '\t', indent );
	const type = typeof value;

	if ( isObjectLike( value ) ) {
		const isArray = Array.isArray( value );
		const children = [ isArray ? '[' : '{' ];

		forEach( value, ( item, key ) => children.push(
			prefix + '\t' + ( isArray ? '' : key + ': ' ),
			<BlockAttributesValue
				key={ key }
				value={ item }
				indent={ indent + 1 }
			/>,
			','
		) );

		if ( children.length > 1 ) {
			// Remove the dangling comma from the last item.
			children.pop();

			// De-indent from assumed multi-line.
			children.push( prefix );
		}

		children.push( isArray ? ']' : '}' );

		return children;
	}

	if ( value instanceof Date ) {
		return `new Date( '${ value.toString() }' )`;
	}

	if ( type === 'function' ) {
		return value.toString();
	}

	if ( type === 'string' ) {
		value = `'${ value.replace( /\\?'/g, '\\\'' ) }'`;
	}

	return (
		<span className={ 'gd-block-attributes__value-fragment is-' + type }>
			{ String( value ) }
		</span>
	);
}

export default BlockAttributesValue;
