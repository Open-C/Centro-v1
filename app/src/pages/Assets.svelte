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


	import { Page, Navbar, NavLeft, NavTitle, NavTitleLarge, NavRight, Link, Toolbar, Block, BlockTitle, List, ListItem, Row, Col, Button, AccordionContent, Card } from 'framework7-svelte'
	import CurrentWallet from '../components/CurrentWallet.svelte'
	import TokenRequestOrSend from '../components/TokenRequestOrSend.svelte'
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
						<TokenRequestOrSend {token} />
					</AccordionContent>
				</ListItem>
			{/each}
		</List>
	{/each}
</Page>