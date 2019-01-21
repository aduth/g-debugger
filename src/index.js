/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import PluginLogo from './components/plugin-logo';
import SidebarDebugger from './components/sidebar-debugger';

registerPlugin( 'g-debugger', {
	icon: <PluginLogo />,
	render: () => <SidebarDebugger />,
} );
