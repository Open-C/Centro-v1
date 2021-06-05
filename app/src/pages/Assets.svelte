<script>
	import { quoteCurrency } from '../data/settings'
	import { tokensBySymbol, baseTokens, ethereumTokens, otherTokens } from '../data/tokens'


	const sections = [
		{
			title: 'Celo Native Assets',
			data: baseTokens,
		},
		// {
		// 	title: 'Ethereum Assets',
		// 	data: ethereumTokens,
		// },
		{
			title: 'Other Assets',
			data: otherTokens
		}
	]


	let transactions = [
		{
			action: 'Send',
			token: tokensBySymbol['CELO'],
			amount: 10,
			price: 10,
			timestamp: 1612345678901
		},
		{
			action: 'Withdraw',
			token: tokensBySymbol['cUSD'],
			amount: 11,
			price: 11.23,
			timestamp: 1622345678901
		},
		{
			action: 'Deposit',
			token: tokensBySymbol['cEUR'],
			amount: 600,
			price: 4.5,
			timestamp: 1621234567890
		},
		{
			action: 'Sell',
			token: tokensBySymbol['CELO'],
			amount: 10,
			price: 10,
			timestamp: 1622345678901
		},
		{
			action: 'Buy',
			token: tokensBySymbol['cUSD'],
			amount: 100,
			price: 20.09,
			timestamp: 1622345678901
		},
		{
			action: 'Receive',
			token: tokensBySymbol['cEUR'],
			amount: 10,
			price: 235,
			timestamp: 1622345678901
		}
	]


	import { actionVerbs } from '../data/actions'
	import { formatValue } from '../utils/formatValue'


	import { Page, Navbar, NavLeft, NavTitle, NavTitleLarge, NavRight, Link, Toolbar, Block, BlockTitle, List, ListItem, Row, Col, Button, AccordionContent, Card, Progressbar, Icon } from 'framework7-svelte'
	import CurrentWallet from '../components/CurrentWallet.svelte'
	import TokenIcon from '../components/TokenIcon.svelte'
	import TokenList from '../components/TokenList.svelte'
	import TokenSend from '../components/TokenSend.svelte'
	import TokenRequestOrSend from '../components/TokenRequestOrSend.svelte'
	import PriceChart from '../components/PriceChart.svelte'
</script>

<Page name="assets">
	<!-- Top Navbar -->
	<Navbar large sliding={false}>
		<NavTitle sliding>Assets</NavTitle>
		<NavTitleLarge>Assets</NavTitleLarge>

		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar>

	<Block strong inset>
		<h2>{formatValue(972.65, $quoteCurrency)}</h2>
		<PriceChart />
	</Block>

	<Block>
		<Row>
			<Col>
				<Block strong noHairlines>
					<p><strong>Goal</strong>: Donate {formatValue(10, $quoteCurrency, 0)}/mo</p>
					<Progressbar progress={70} />
				</Block>
			</Col>
			<Col>
				<Block strong noHairlines>
					<h4>Total Interest Earned</h4>
					<p>{formatValue(12.34, $quoteCurrency)}</p>
				</Block>
			</Col>
		</Row>
	</Block>

	{#each sections as {title, data: tokens}}
		<BlockTitle medium>{title}</BlockTitle>

		<TokenList inset accordionList
			{tokens}
			let:token
		>
			<AccordionContent>
				<TokenRequestOrSend {token} />
			</AccordionContent>
		</TokenList>
	{/each}

	<BlockTitle medium>Deposit/Withdraw</BlockTitle>
	<List inset>
		<ListItem
			link="/apps/bank-account"
			title="Bank Account"
			footer="Deposit/withdraw from a U.S. bank account"
		>
			<Icon slot="media" f7="building_2_fill" />
		</ListItem>

		<ListItem
			link="/apps/bank-account"
			title="Mobile Money"
			footer="Deposit/withdraw from MPesa, MTN, ZamPay"
		>
			<Icon slot="media" f7="device_tablet_portrait" />
		</ListItem>

		<ListItem accordionItem
			title="External Wallet"
			footer="Send tokens to another Centro/Celo wallet"
		>
			<Icon slot="media" f7="creditcard_fill" />
			<AccordionContent>
				<Block>
					<TokenSend availableTokens={baseTokens} />
				</Block>
			</AccordionContent>
		</ListItem>
	</List>

	<BlockTitle medium>Past Transactions</BlockTitle>
	<List accordionList inset>
		{#each transactions as transaction}
			<ListItem accordionItem
				title="{actionVerbs[transaction.action].pastTense} {formatValue(transaction.amount, transaction.token.symbol)}"
				footer={new Date(transaction.timestamp).toLocaleDateString()}
				style="
					--f7-theme-color: {transaction.token.color}
				"
			>
				<TokenIcon token={transaction.token} />

				<div slot="after">
					<mark class="value">{formatValue(transaction.price * transaction.amount, $quoteCurrency)}</mark>
					<span class="after-footer">
						Price: {formatValue(transaction.price, $quoteCurrency)}
					</span>
				</div>

				<AccordionContent>
					<Block>
						<Button fill>View in Block Explorer</Button>
					</Block>
				</AccordionContent>
			</ListItem>
		{/each}
	</List>
</Page>