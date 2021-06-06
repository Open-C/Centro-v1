export default [
	{
		path: '/',
		component: require('./pages/Apps.svelte').default,
		// options: {
		// 	transition: 'f7-dive',
		// }
		master: true
	},
	{
		path: '/apps',
		component: require('./pages/Apps.svelte').default,
		// options: {
		// 	transition: 'f7-dive',
		// },
		master: true
	},
	{
		path: '/apps/moolamarket',
		component: require('./pages/apps/MoolaMarket.svelte').default,
	},
	{
		path: '/apps/mento',
		component: require('./pages/apps/Mento.svelte').default,
	},
	{
		path: '/apps/pay',
		component: require('./pages/apps/Pay.svelte').default,
	},
	{
		path: '/apps/ubeswap',
		component: require('./pages/apps/Ubeswap.svelte').default,
	},
	{
		path: '/explorer',
		component: require('./pages/apps/BlockExplorer.svelte').default,
	},
	{
		path: '/apps/pollen',
		component: require('./pages/apps/Pollen.svelte').default,
		master: true
	},
	{
		path: '/apps/pollen/:pollenCircleID',
		component: require('./pages/apps/pollen/Circle.svelte').default,
	},
	{
		path: '/apps/carbonoffset',
		component: require('./pages/apps/CarbonOffset.svelte').default,
	},
	{
		path: '/apps/impactmarket',
		component: require('./pages/apps/ImpactMarket.svelte').default,
	},
	{
		path: '/assets',
		component: require('./pages/Assets.svelte').default,
		master: true
	},
	{
		path: '/assets/:tokenSymbolOrContractAddress',
		component: require('./pages/assets/Token.svelte').default
	},
	{
		path: '/settings',
		component: require('./pages/Settings.svelte').default,
		master: true
	},
	{
		path: '/settings/wallets',
		component: require('./pages/settings/Wallets.svelte').default,
	},
	{
		path: '(.*)',
		component: require('./pages/404.svelte').default,
	},
]
