<script>
	const availableTokens = [
		{
			name: 'Celo Gold',
			symbol: 'CELO',
			image: require('../../static/images/celo-icon.png').default,
			color: '#fbcc5c'
		},
		{
			name: 'Celo Dollar',
			symbol: 'cUSD',
			image: require('../../static/images/cusd-icon.png').default,
			color: '#54c49b'
		},
		{
			name: 'Celo Euro',
			symbol: 'cEUR',
			image: require('../../static/images/ceur-icon.png').default,
			color: '#6e9fec'
		}
	]


	let fromToken
	let toToken


	const today = new Date()
	const year = today.getFullYear()
	const month = today.getMonth()
	const dates = Array.from({length: 4}).map((_, i) => new Date(year, month - (3 - i)))
	const axisDateFormat = Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' });
	const tooltipDateFormat = Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });


	import { Page, Navbar, Block, AreaChart } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TokenSwap from '../../components/TokenSwap.svelte'
</script>

<Page>
	<Navbar title="Mento" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar>

	<Block strong inset>
		{#if fromToken}
			<AreaChart
				axis
				axisLabels={dates}
				legend
				lineChart
				formatAxisLabel={(date) => axisDateFormat.format(date)}
				formatTooltipAxisLabel={(date) => tooltipDateFormat.format(date)}
				datasets={[
					{
						label: fromToken.symbol,
						color: fromToken.color,
						values: [0, 100, 250, 300, 175, 400],
					}
				]}
			/>
			<!-- toggleDatasets -->
		{/if}
	</Block>

	<Block strong inset>
		<TokenSwap
			bind:fromToken
			bind:toToken
			{availableTokens}
		/>
	</Block>
</Page>
