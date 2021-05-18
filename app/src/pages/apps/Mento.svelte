<script>
	const availableTokens = [
		{
			name: 'Celo Gold',
			symbol: 'CELO',
			image: require('../../static/images/celo-icon.png').default
		},
		{
			name: 'Celo Dollar',
			symbol: 'cUSD',
			image: require('../../static/images/cusd-icon.png').default
		},
		{
			name: 'Celo Euro',
			symbol: 'cEUR',
			image: require('../../static/images/ceur-icon.png').default
		}
	]


	import { Page, Navbar, Block } from 'framework7-svelte'
	import TokenSwap from '../../components/TokenSwap.svelte'
</script>

<Page>
	<Navbar title="Mento" backLink="Apps">
	</Navbar>

	<Block strong inset>
		<TokenSwap
			{availableTokens}
		/>
	</Block>
</Page>
