<script>
	const sections = [
		{
			title: 'Celo Native Assets',
			data: [
				{
					name: 'Celo Gold',
					symbol: 'CELO',
					image: require('../static/images/celo-icon.png').default
				},
				{
					name: 'Celo Dollar',
					symbol: 'cUSD',
					image: require('../static/images/cusd-icon.png').default
				},
				{
					name: 'Celo Euro',
					symbol: 'cEUR',
					image: require('../static/images/ceur-icon.png').default
				}
			]
		},
		{
			title: 'Other Assets',
			data: [
				{
					name: 'Moola CELO',
					symbol: 'mCELO',
					image: require('../static/images/celo-icon.png').default
				},
				{
					name: 'Moola cUSD',
					symbol: 'mcUSD',
					image: require('../static/images/cusd-icon.png').default
				},
				{
					name: 'Moola cEUR',
					symbol: 'mcEUR',
					image: require('../static/images/ceur-icon.png').default
				},
				{
					name: 'Celo Moss Carbon Credit',
					symbol: 'cMCO2',
					image: require('../static/images/celo-icon.png').default
				}
			]
		}
	]

	const baseAssets = sections[0].data

	import { tokenBalances } from '../data/tokenBalances'


	let transactions = [
		{
			action: 'Send',
			token: baseAssets[0],
			amount: 10,
			price: 10,
			timestamp: 1612345678901
		},
		{
			action: 'Withdraw',
			token: baseAssets[1],
			amount: 11,
			price: 11.23,
			timestamp: 1622345678901
		},
		{
			action: 'Deposit',
			token: baseAssets[2],
			amount: 600,
			price: 4.5,
			timestamp: 1621234567890
		},
		{
			action: 'Sell',
			token: baseAssets[0],
			amount: 10,
			price: 10,
			timestamp: 1622345678901
		},
		{
			action: 'Buy',
			token: baseAssets[1],
			amount: 100,
			price: 20.09,
			timestamp: 1622345678901
		},
		{
			action: 'Receive',
			token: baseAssets[2],
			amount: 10,
			price: 235,
			timestamp: 1622345678901
		}
	]


	import { actionVerbs } from '../data/actions'


	import { Page, Navbar, NavLeft, NavTitle, NavTitleLarge, NavRight, Link, Toolbar, Block, BlockTitle, List, ListItem, Row, Col, Button, AccordionContent, Card, Progressbar, Icon } from 'framework7-svelte'
	import CurrentWallet from '../components/CurrentWallet.svelte'
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
		<h2>$972.65</h2>
		<PriceChart />
	</Block>

	<Block>
		<Row>
			<Col>
				<Block strong>
					<p><strong>Goal</strong>: Donate $10/mo</p>
					<Progressbar progress={70} />
				</Block>
			</Col>
			<Col>
				<Block strong>
					<h4>Total Interest Earned</h4>
					<p>$12.34</p>
				</Block>
			</Col>
		</Row>
	</Block>

	{#each sections as {title, data: tokens}}
		<BlockTitle medium>{title}</BlockTitle>

		<List accordionList inset>
			{#each tokens as token}
				<ListItem accordionItem
					title={token.name}
					footer={token.symbol}
					after={tokenBalances[token.symbol]?.amount || 0}
				>
					<img slot="media" src={token.logoURI} height="40" />
					<AccordionContent>
						<TokenRequestOrSend {token} />
					</AccordionContent>
				</ListItem>
			{/each}
		</List>
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
				title="{actionVerbs[transaction.action].pastTense} {transaction.amount} {transaction.token.symbol}"
				footer={new Date(transaction.timestamp).toLocaleDateString()}
				after="${transaction.price}"
			>
				<img slot="media" src={transaction.token.logoURI} height="40" />
				<AccordionContent>
					<Block>
						<Button fill>View in Block Explorer</Button>
					</Block>
				</AccordionContent>
			</ListItem>
		{/each}
	</List>
</Page>