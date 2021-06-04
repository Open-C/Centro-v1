<script>
	import { setContext } from 'svelte'
	export let f7router
	setContext('f7router', f7router)


	import { tokensBySymbol } from '../../data/tokens'
	
	const depositBorrowRates = {
		'mCELO': {
			depositAPY: 0.0001,
			borrowAPR: 0.0114,
		},
		'mcUSD': {
			depositAPY: 0.0057,
			borrowAPR: 0.0057,
		},
		'mcEUR': {
			depositAPY: 0.0033,
			borrowAPR: 0.0258
		}
	}

	const moolaTokenPairs = Object.entries({
		'CELO': 'mCELO',
		'cUSD': 'mcUSD',
		'cEUR': 'mcEUR',
		// 'TEST': 'mTEST'
	}).map(([base, wrapped]) => ({
		baseToken: tokensBySymbol[base],
		wrappedToken: tokensBySymbol[wrapped]
	}))
	console.log('moolaTokenPairs', moolaTokenPairs)
		

	import { tokenBalances } from '../../data/tokenBalances'
	import { tokenPricesUSD } from '../../data/tokenPrices'

	import { formatPercent } from '../../utils/formatPercent'

	import { Page, Navbar, Block, BlockTitle, List, ListItem, AccordionContent, NavTitle, PieChart } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TokenDepositOrWithdraw from '../../components/TokenDepositOrWithdraw.svelte'
	import TokenBorrowOrRepay from '../../components/TokenBorrowOrRepay.svelte'
	import TabLayout from '../../components/TabLayout.svelte'
</script>

<Page style="--f7-theme-color: {tokensBySymbol['mcUSD'].color}">
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
			<BlockTitle medium>Total Deposited: $100</BlockTitle>
			<Block inset strong>
				<div class="line">
					<div class="chart">
						<PieChart
							datasets={moolaTokenPairs.map(({baseToken, wrappedToken}) => ({
								label: wrappedToken.symbol,
								value: tokenBalances[wrappedToken.symbol]?.amount * tokenPricesUSD[wrappedToken.symbol],
								color: wrappedToken.color,
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

			<BlockTitle medium>Deposited Assets</BlockTitle>

			<List accordionList inset>
				{#each moolaTokenPairs as {baseToken, wrappedToken}}
					<ListItem accordionItem
						title={wrappedToken.name}
						footer="{tokenBalances[wrappedToken.symbol]?.amount} {wrappedToken.symbol}"
						style="
							--f7-theme-color: {wrappedToken.color}
						"
					>
						<img slot="media" src={wrappedToken.logoURI} height="40" />

						<svelte:fragment slot="after">
							APY:&nbsp;<strong><mark>{formatPercent(depositBorrowRates[wrappedToken.symbol].depositAPY)}</mark></strong>
						</svelte:fragment>

						<AccordionContent>
							<TokenDepositOrWithdraw
								depositToken={baseToken}
								maxDepositAmount={tokenBalances[baseToken.symbol]?.amount}
								withdrawToken={wrappedToken}
								maxWithdrawAmount={tokenBalances[wrappedToken.symbol]?.amount}
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
						after={tokenBalances[baseToken.symbol]?.amount}
					>
						<img slot="media" src={token.logoURI} height="40" />

						<svelte:fragment slot="header">
							APY:&nbsp;<strong>{formatPercent(depositBorrowRates[token.symbol].depositAPY)}</strong>
						</svelte:fragment>

						<AccordionContent>
							<TokenDepositOrWithdraw
								depositToken={baseToken}
								maxDepositAmount={tokenBalances[baseToken.symbol]?.amount}
								withdrawToken={wrappedToken}
								maxWithdrawAmount={tokenBalances[wrappedToken.symbol]?.amount}
							/>
						</AccordionContent>
					</ListItem>
				{/each}
			</List>

			<List accordionList inset>
				{#each tokens as token}
					<ListItem accordionItem
						title={token.name}
						after="{tokenBalances[baseToken.symbol]?.amount} {baseToken.symbol}"
					>
						<img slot="media" src={token.logoURI} height="40" />

						<svelte:fragment slot="footer">
							APY:&nbsp;<strong>{formatPercent(depositBorrowRates[token.symbol].depositAPY)}</strong>
						</svelte:fragment>

						<AccordionContent>
							<TokenDepositOrWithdraw
								depositToken={baseToken}
								maxDepositAmount={tokenBalances[baseToken.symbol]?.amount}
								withdrawToken={wrappedToken}
								maxWithdrawAmount={tokenBalances[wrappedToken.symbol]?.amount}
							/>
						</AccordionContent>
					</ListItem>
				{/each}
			</List> -->

		{:else if tab === 'borrowing'}
			<BlockTitle medium>Total Borrowed: $0</BlockTitle>
			<Block inset strong>
				<div class="line">
					<div class="chart">
						<PieChart
							datasets={moolaTokenPairs.map(({baseToken, wrappedToken}) => ({
								label: baseToken.symbol,
								value: tokenBalances[baseToken.symbol]?.amount * tokenPricesUSD[baseToken.symbol],
								color: baseToken.color,
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

			<BlockTitle medium>Borrowed Assets</BlockTitle>

			<List accordionList inset>
				{#each moolaTokenPairs as {baseToken, wrappedToken}}
					<ListItem accordionItem
						title={baseToken.name}
						footer="{tokenBalances[baseToken.symbol]?.amount} {baseToken.symbol}"
						style="
							--f7-theme-color: {baseToken.color}
						"
					>
						<img slot="media" src={baseToken.logoURI} height="40" />

						<svelte:fragment slot="after">
							APR:&nbsp;<strong><mark>{formatPercent(depositBorrowRates[wrappedToken.symbol].borrowAPR)}</mark></strong>
						</svelte:fragment>

						<AccordionContent>
							<TokenBorrowOrRepay
								token={baseToken}
								maxBorrowAmount={100}
								maxRepayAmount={tokenBalances[baseToken.symbol]?.amount}
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