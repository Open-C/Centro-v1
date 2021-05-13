<script>
	export let action = 'Send'
	export let availableTokens = undefined
	export let token
	export let maxAmount
	export let amount


	// let isFocused = false
	// let textInputValue = String(amount)


	// $: {
	// 	const parsedAmount = Math.min(parseFloat(textInputValue), maxAmount)
	// 	if(Number.isFinite(parsedAmount))
	// 		amount = parsedAmount
	// }

	// $: if(!isFocused)
	// 	textInputValue = String(amount)


	import { Row, Button, Range, Input } from 'framework7-svelte'
</script>

<style>
	:global(input[type="number"]) {
		font-weight: bold;
		text-align: center;
	}
</style>

<div class="line">
	<h3>{action}</h3>
	<Input
		type="number"
		bind:value={amount}
		min={0}
		max={maxAmount}
		placeholder="0"
		clearButton
		autofocus
	/>
	<!-- <Input
		type="number"
		clearButton
		autofocus
		placeholder="0"
		bind:value={textInputValue}
		onFocus={() => isFocused = true}
		onBlur={() => isFocused = false}
	/> -->
	<span>{token.symbol}</span>
</div>
<Row>
	<Button small fill onClick={() => amount = 0.10 * maxAmount}>10%</Button>
	<Button small fill onClick={() => amount = 0.25 * maxAmount}>25%</Button>
	<Button small fill onClick={() => amount = 0.50 * maxAmount}>50%</Button>
	<Button small fill onClick={() => amount = 0.75 * maxAmount}>75%</Button>
	<Button small fill onClick={() => amount = 1.00 * maxAmount}>max</Button>
</Row>
<Range
	value={amount} onRangeChange={_ => amount = _}
	min={0}
	max={maxAmount}
	color={token.color}
	style="--f7-range-knob-background-image: url('{token.image}')"
	scaleSteps={5}
	scaleSubSteps={20}
	formatScaleLabel={value => value === 100 ? 'max' : value}
/>