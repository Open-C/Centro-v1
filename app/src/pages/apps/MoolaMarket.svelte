<script>
	import { setContext } from 'svelte'
	export let f7router
	setContext('f7router', f7router)


	const tokens = [
		{
			name: 'Celo Gold',
			symbol: 'mCELO',
			image: require('../../static/images/celo-icon.png').default,
			color: '#fbcc5c',
			depositAPY: 0.0001,
			borrowAPR: 0.0114,
		},
		{
			name: 'Celo Dollar',
			symbol: 'mcUSD',
			image: require('../../static/images/cusd-icon.png').default,
			color: '#54c49b',
			depositAPY: 0.0057,
			borrowAPR: 0.0057,
		},
		{
			name: 'Celo Euro',
			symbol: 'mcEUR',
			image: require('../../static/images/ceur-icon.png').default,
			color: '#6e9fec',
			depositAPY: 0.0033,
			borrowAPR: 0.0258
		}
	]

	const mapping = {
		'mCELO': 'CELO',
		'mcUSD': 'cUSD',
		'mcEUR': 'cEUR',
	}

	import { tokenBalances } from '../../data/tokenBalances'
	import { tokenPricesUSD } from '../../data/tokenPrices'


	import { Page, Navbar, Block, BlockTitle, List, ListItem, AccordionContent, NavTitle, PieChart } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TokenDepositOrWithdraw from '../../components/TokenDepositOrWithdraw.svelte'
	
	import { formatPercent } from '../../utils/formatPercent'
	import TabLayout from '../../components/TabLayout.svelte'
import TokenBorrowOrRepay from '../../components/TokenBorrowOrRepay.svelte';
</script>

<Page>
	<Navbar sliding={false} backLink="Apps">
		<NavTitle slot="title" sliding>
			<img src={require('../../static/images/moola-logo.png').default} alt="MoolaMarket" height={30} />
		</NavTitle>

		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar>

	<TabLayout swipeable
		tabs={{
			'lending': 'Lending',
			'borrowing': 'Borrowing'
		}}
		startTab={'lending'}
		let:tab
	>
		{#if tab === 'lending'}
			<BlockTitle>Total Deposited: $100</BlockTitle>
			<Block inset strong>
				<div class="line">
					<div class="chart">
						<PieChart
							datasets={tokens.map(token => ({
								label: token.symbol,
								value: tokenBalances[token.symbol].amount * tokenPricesUSD[token.symbol],
								color: token.color,
							}))}
							tooltip
							size={30}
						/>
					</div>
					<div>
						<p>Overall APY: 0.3%</p>
					</div>
				</div>
			</Block>

			<BlockTitle>Deposited Assets</BlockTitle>

			<List accordionList inset>
				{#each tokens as token}
					<ListItem accordionItem
						title={token.name}
						footer="{tokenBalances[token.symbol].amount} {token.symbol}"
					>
						<img slot="media" src={token.image} height="40" />

						<svelte:fragment slot="after">
							APY:&nbsp;<strong>{formatPercent(token.depositAPY)}</strong>
						</svelte:fragment>

						<AccordionContent>
							<TokenDepositOrWithdraw
								depositToken={{...token, symbol: mapping[token.symbol]}}
								maxDepositAmount={tokenBalances[mapping[token.symbol]].amount}
								withdrawToken={token}
								maxWithdrawAmount={tokenBalances[token.symbol].amount}
							/>
						</AccordionContent>
					</ListItem>
				{/each}
			</List>

			<!-- <List accordionList inset>
				{#each tokens as token}
					<ListItem accordionItem
						title={token.name}
						footer={token.symbol}
						after={tokenBalances[token.symbol].amount}
					>
						<img slot="media" src={token.image} height="40" />

						<svelte:fragment slot="header">
							APY:&nbsp;<strong>{formatPercent(token.depositAPY)}</strong>
						</svelte:fragment>

						<AccordionContent>
							<TokenDepositOrWithdraw
								depositToken={{...token, symbol: mapping[token.symbol]}}
								maxDepositAmount={tokenBalances[mapping[token.symbol]].amount}
								withdrawToken={token}
								maxWithdrawAmount={tokenBalances[token.symbol].amount}
							/>
						</AccordionContent>
					</ListItem>
				{/each}
			</List>

			<List accordionList inset>
				{#each tokens as token}
					<ListItem accordionItem
						title={token.name}
						after="{tokenBalances[token.symbol].amount} {token.symbol}"
					>
						<img slot="media" src={token.image} height="40" />

						<svelte:fragment slot="footer">
							APY:&nbsp;<strong>{formatPercent(token.depositAPY)}</strong>
						</svelte:fragment>

						<AccordionContent>
							<TokenDepositOrWithdraw
								depositToken={{...token, symbol: mapping[token.symbol]}}
								maxDepositAmount={tokenBalances[mapping[token.symbol]].amount}
								withdrawToken={token}
								maxWithdrawAmount={tokenBalances[token.symbol].amount}
							/>
						</AccordionContent>
					</ListItem>
				{/each}
			</List> -->

		{:else if tab === 'borrowing'}
			<BlockTitle>Total Borrowed: $0</BlockTitle>
			<Block inset strong>
				<div class="line">
					<div class="chart">
						<PieChart
							datasets={tokens.map(token => ({
								label: token.symbol,
								value: tokenBalances[token.symbol].amount * tokenPricesUSD[token.symbol],
								color: token.color,
							}))}
							tooltip
							size={30}
						/>
					</div>
					<div>
						<p>Overall APR: 0.3%</p>
						<p>Liquidation Threshold: 80%</p>
						<p>Maximum Loan to Value: 75%</p>
						<p>Health Factor: SAFE</p>
					</div>
				</div>
			</Block>

			<BlockTitle>Borrowed Assets</BlockTitle>

			<List accordionList inset>
				{#each tokens as token}
					<ListItem accordionItem
						title={token.name}
						footer="{tokenBalances[token.symbol].amount} {token.symbol}"
					>
						<img slot="media" src={token.image} height="40" />

						<svelte:fragment slot="after">
							APR:&nbsp;<strong>{formatPercent(token.borrowAPR)}</strong>
						</svelte:fragment>

						<AccordionContent>
							<TokenBorrowOrRepay
								{token}
								maxBorrowAmount={100}
								maxRepayAmount={tokenBalances[token.symbol].amount}
							/>
						</AccordionContent>
					</ListItem>
				{/each}
			</List>
		{/if}
	</TabLayout>
</Page>


<style>
	.chart {
		width: 10em;
		/* margin: auto; */
	}
</style>