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
		},
		{
			name: 'Moola cUSD',
			symbol: 'mcUSD',
			image: require('../../static/images/cusd-icon.png').default
		},
		{
			name: 'Moola cEUR',
			symbol: 'mcEUR',
			image: require('../../static/images/ceur-icon.png').default
		},
		{
			name: 'Celo Moss Carbon Credit',
			symbol: 'cMCO2',
			image: require('../../static/images/celo-icon.png').default
		}
	]


	import { Page, Navbar, Block, NavTitle } from 'framework7-svelte'
	import TokenSwap from '../../components/TokenSwap.svelte'
</script>

<Page>
	<Navbar backLink="Apps">
		<NavTitle>
			<img src={require('../../static/images/ubeswap-logo.png').default} alt="Ubeswap" height={30} />
			Ubeswap
		</NavTitle>
	</Navbar>

	<Block strong inset>
		<TokenSwap
			{availableTokens}
		/>
	</Block>
</Page>
