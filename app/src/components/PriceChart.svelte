<script>
	import { tokensBySymbol } from '../data/tokens'

	export let token = tokensBySymbol['CELO']


	$: data = [
		{
			label: token.symbol,
			color: token.color,
			values: [0, 100, 250, 300, 175, 400],
		}
	]


	const today = new Date()
	const year = today.getFullYear()
	const month = today.getMonth()
	const dates = Array.from({length: 4}).map((_, i) => new Date(year, month - (3 - i)))
	const axisDateFormat = Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' });
	const tooltipDateFormat = Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });


	import { AreaChart } from 'framework7-svelte'
</script>

<AreaChart
	axis
	axisLabels={dates}
	legend
	lineChart
	formatAxisLabel={(date) => axisDateFormat.format(date)}
	formatTooltipAxisLabel={(date) => tooltipDateFormat.format(date)}
	datasets={data}
	toggleDatasets={data.length > 1}
/>