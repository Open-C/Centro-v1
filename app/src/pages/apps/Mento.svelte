<script>
	const availableTokens = [
		{
			name: 'Celo Gold',
			symbol: 'CELO',
			image: require('../../static/images/celo-icon.png').default,
			color: '#fbcc5c'
		},
		{
			name: 'Celo Dollar',
			symbol: 'cUSD',
			image: require('../../static/images/cusd-icon.png').default,
			color: '#54c49b'
		},
		{
			name: 'Celo Euro',
			symbol: 'cEUR',
			image: require('../../static/images/ceur-icon.png').default,
			color: '#6e9fec'
		}
	]


	let fromToken
	let toToken


	import { Page, Navbar, Block } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TokenSwap from '../../components/TokenSwap.svelte'
	import PriceChart from '../../components/PriceChart.svelte'
</script>

<Page>
	<Navbar title="Mento" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar>

	<Block strong inset>
		{#if fromToken}
			<PriceChart token={fromToken} />
		{/if}
	</Block>

	<TokenSwap
		bind:fromToken
		bind:toToken
		{availableTokens}
	/>
</Page>
