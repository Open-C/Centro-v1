<script>
	import { tokens, tokensBySymbol } from '../../data/tokens'


	import { Page, Navbar, NavTitle, Block } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TabLayout from '../../components/TabLayout.svelte'
	import TokenSwap from '../../components/TokenSwap.svelte'
	import TokenPool from '../../components/TokenPool.svelte'
</script>

<Page style="--f7-theme-color: {tokensBySymbol['UBE'].color}">
	<Navbar backLink="Apps">
		<NavTitle>
			<img src={require('../../static/images/ubeswap-logo.png').default} alt="Ubeswap" width={25} height={25} />
			Ubeswap
			<div class="subtitle">swap CELO and cERC-20 tokens</div>
		</NavTitle>
	</Navbar>
	<!-- <Navbar backLink="Apps">
		<svelte:fragment slot="title"> -->
	<!-- <Navbar large backLink="Apps">
		<svelte:fragment slot="title-large">
			<img src={require('../../static/images/ubeswap-logo.png').default} alt="Ubeswap" height={30} />
			Ubeswap
		</svelte:fragment>

		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar> -->

	
	<TabLayout swipeable
		tabs={{
			'swap': 'Swap',
			'deposit': 'Deposit/Farm'
		}}
		startTab={'swap'}
		
		let:tab
	>
		{#if tab === 'swap'}
			<TokenSwap
				availableTokens={tokens}
			/>
		{:else if tab === 'deposit'}
			<TokenPool
				availableTokens={tokens}
			/>
		{/if}
	</TabLayout>
</Page>
