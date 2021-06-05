<script>
	import { tokenBalances } from '../../data/tokenBalances'
	import { tokensBySymbol } from '../../data/tokens'

	const token = tokensBySymbol['cUSD']


	import { Page, Navbar, Block } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TabLayout from '../../components/TabLayout.svelte'
	import TokenRequest from '../../components/TokenRequest.svelte'
	import TokenSend from '../../components/TokenSend.svelte'
</script>


<Page style="--f7-theme-color: {tokensBySymbol['cEUR'].color}">
	<Navbar title="Pay" backLink="Apps" />
	<!-- <Navbar title="Pay" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar> -->

	
	<TabLayout swipeable
		tabs={{
			'send': 'Send',
			'request': 'Request'
		}}
		startTab={'send'}
		
		let:tab
	>
		{#if tab === 'request'}
			<Block inset strong>
				<TokenRequest {token} />
			</Block>
		{:else if tab === 'send'}
			<Block inset strong>
				<TokenSend
					token={token}
				/>
			</Block>
		{/if}
	</TabLayout>

	<!-- <Block inset strong>
		<TokenSend
			token={token}
			maxAmount={tokenBalances[token.symbol]?.amount}
		/>
	</Block>
	<Block inset strong>
		<TokenRequest {token} />
	</Block> -->
</Page>
