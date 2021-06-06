<script>
	export let f7route
	let {tokenSymbolOrContractAddress} = f7route.params
	

	import { tokensBySymbol } from '../../data/tokens'
	$: symbol = tokenSymbolOrContractAddress
	$: token = tokensBySymbol[symbol]


	import { quoteCurrency } from '../../data/settings'
	import { tokenPricesUSD } from '../../data/tokenPrices'
	import { tokenBalances } from '../../data/tokenBalances'
	import { transactions } from '../../data/transactions'


	import { formatValue } from '../../utils/formatValue'


	import { Page, Navbar, NavTitle, NavRight, Block, BlockTitle, List, ListItem, Row, Col, Button, AccordionContent, Card, Progressbar, Icon } from 'framework7-svelte'
	import TokenIcon from '../../components/TokenIcon.svelte'
	import TokenRequestOrSend from '../../components/TokenRequestOrSend.svelte'
	import Transactions from '../../components/Transactions.svelte'
	import PriceChart from '../../components/PriceChart.svelte'
</script>


<Page style="--f7-theme-color: {token.color}">
	<Navbar backLink="Assets">
		<NavTitle>
			{token.symbol}
			<div class="subtitle">{token.name}</div>
		</NavTitle>

		<NavRight>
			<TokenIcon {token} />
		</NavRight>
	</Navbar>


	<Block strong inset>
		<h2>{formatValue((tokenBalances[token.symbol]?.amount ?? 0) * (tokenPricesUSD[token.symbol] ?? 0), $quoteCurrency)}</h2>
		<PriceChart {token} />

		<TokenRequestOrSend {token} />
	</Block>


	<BlockTitle medium>Past Transactions</BlockTitle>
	<Transactions transactions={$transactions.filter(transaction => transaction.token.symbol === token.symbol)} />
</Page>