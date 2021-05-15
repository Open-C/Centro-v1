<script>
	const sections = [
		{
			title: 'Deposited Assets',
			data: [
				{
					name: 'Celo Gold',
					symbol: 'mCELO',
					image: require('../../static/images/celo-icon.png').default
				},
				{
					name: 'Celo Dollar',
					symbol: 'mcUSD',
					image: require('../../static/images/cusd-icon.png').default
				},
				{
					name: 'Celo Euro',
					symbol: 'mcEUR',
					image: require('../../static/images/ceur-icon.png').default
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
	import TokenDepositOrWithdraw from '../../components/TokenDepositOrWithdraw.svelte'
	
	
	
	import { setContext } from 'svelte'
	export let f7router
	setContext('f7router', f7router)
</script>

<Page>
	<Navbar backLink="Apps">
		<NavTitle><img src={require('../../static/images/moola-logo.png').default} alt="MoolaMarket" height={30} /></NavTitle>
	</Navbar>

	{#each sections as {title, data: tokens}}
		<BlockTitle>{title}</BlockTitle>

		<List accordionList inset>
			{#each tokens as token}
				<ListItem accordionItem
					title={token.name}
					footer={token.symbol}
					after={tokenBalances[token.symbol].amount}
				>
					<img slot="media" src={token.image} height="40" />
					<AccordionContent>
						<Block>
							<TokenDepositOrWithdraw
								depositToken={{...token, symbol: mapping[token.symbol]}}
								maxDepositAmount={tokenBalances[mapping[token.symbol]].amount}
								withdrawToken={token}
								maxWithdrawAmount={tokenBalances[token.symbol].amount}
							/>
						</Block>
					</AccordionContent>
				</ListItem>
			{/each}
		</List>
	{/each}
</Page>
