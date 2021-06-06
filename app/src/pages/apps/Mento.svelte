<script>
	import { baseTokens, tokensBySymbol } from '../../data/tokens'


	let fromToken
	let toToken


	import { Page, Navbar, Block, NavTitle } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TokenSwap from '../../components/TokenSwap.svelte'
	import PriceChart from '../../components/PriceChart.svelte'
</script>

<Page style="--f7-theme-color: {tokensBySymbol['cMCO2'].color}">
	<Navbar backLink="Apps" style="--f7-theme-color: {tokensBySymbol['cMCO2'].color}">
		<NavTitle>
			Mento
			<div class="subtitle">buy/sell CELO from the reserve</div>
		</NavTitle>
	</Navbar>
	<!-- <Navbar title="Mento" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar> -->

	<Block strong inset>
		{#if fromToken}
			<PriceChart token={fromToken} />
		{/if}
	</Block>

	<TokenSwap
		bind:fromToken
		bind:toToken
		availableTokens={baseTokens}
	/>
</Page>
