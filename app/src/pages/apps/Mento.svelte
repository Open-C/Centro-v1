<script>
	import { baseTokens } from '../../data/tokens'


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
		availableTokens={baseTokens}
	/>
</Page>
