<script>
	import { tokenBalances } from '../../data/tokenBalances'

	const token = {
		name: 'Celo Dollar',
		symbol: 'cUSD',
		image: require('../../static/images/cusd-icon.png').default
	}


	import { Page, Navbar, Block } from 'framework7-svelte'
	import TokenRequest from '../../components/TokenRequest.svelte'
	import TokenSend from '../../components/TokenSend.svelte'
</script>

<Page>
	<Navbar title="Pay" backLink="Apps">
	</Navbar>

	<Block inset strong>
		<TokenSend
			token={token}
			maxAmount={tokenBalances[token.symbol].amount}
		/>
	</Block>
	<Block inset strong>
		<TokenRequest {token} />
	</Block>
</Page>
