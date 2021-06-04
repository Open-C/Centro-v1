<script>
	import { tokenBalances } from '../../data/tokenBalances'
	import { tokensBySymbol } from '../../data/tokens'

	const token = {
		name: 'Celo Dollar',
		symbol: 'cUSD',
		image: require('../../static/images/cusd-icon.png').default
	}


	import { Page, Navbar, Block } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TokenRequest from '../../components/TokenRequest.svelte'
	import TokenSend from '../../components/TokenSend.svelte'
</script>


<Page style="--f7-theme-color: {tokensBySymbol['cEUR'].color}">
	<Navbar title="Pay" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar>

	<Block inset strong>
		<TokenSend
			token={token}
			maxAmount={tokenBalances[token.symbol]?.amount}
		/>
	</Block>
	<Block inset strong>
		<TokenRequest {token} />
	</Block>
</Page>
