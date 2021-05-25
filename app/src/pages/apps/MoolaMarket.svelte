<script>
	import { setContext } from 'svelte'
	export let f7router
	setContext('f7router', f7router)


	const sections = [
		{
			title: 'Deposited Assets',
			data: [
				{
					name: 'Celo Gold',
					symbol: 'mCELO',
					image: require('../../static/images/celo-icon.png').default,
					depositAPY: 0.0001,
					borrowAPR: 0.0114
				},
				{
					name: 'Celo Dollar',
					symbol: 'mcUSD',
					image: require('../../static/images/cusd-icon.png').default,
					depositAPY: 0.0057,
					borrowAPR: 0.0057
				},
				{
					name: 'Celo Euro',
					symbol: 'mcEUR',
					image: require('../../static/images/ceur-icon.png').default,
					depositAPY: 0.0033,
					borrowAPR: 0.0258
				}
			]
		}
	]

	const mapping = {
		'mCELO': 'CELO',
		'mcUSD': 'cUSD',
		'mcEUR': 'cEUR'
	}

	import { tokenBalances } from '../../data/tokenBalances'


	import { Page, Navbar, Block, BlockTitle, List, ListItem, AccordionContent, NavTitle } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TokenDepositOrWithdraw from '../../components/TokenDepositOrWithdraw.svelte'
	
	import { formatPercent } from '../../utils/formatPercent'
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

	{#each sections as {title, data: tokens}}
		<BlockTitle>{title}</BlockTitle>

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

		<List accordionList inset>
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
		</List>
	{/each}
</Page>
