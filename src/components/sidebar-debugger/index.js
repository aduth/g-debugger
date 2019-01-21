/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';

/**
 * Internal dependencies
 */
import AttributeInspector from '../attribute-inspector';

function SidebarDebugger() {
	return (
		<Fragment>
			<PluginSidebarMoreMenuItem target="g-debugger">
				G Debugger
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name="g-debugger"
				title="G Debugger"
			>
				<AttributeInspector />
			</PluginSidebar>
		</Fragment>
	);
}

export default SidebarDebugger;
