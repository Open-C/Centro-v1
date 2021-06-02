<script>
	export let action = 'Send'
	export let availableTokens = undefined
	export let token = availableTokens?.[0] ?? {}
	export let maxAmount
	export let amount


	export let showSlider = true
	// let isFocused = false
	// let textInputValue = String(amount)


	// $: {
	// 	const parsedAmount = Math.min(parseFloat(textInputValue), maxAmount)
	// 	if(Number.isFinite(parsedAmount))
	// 		amount = parsedAmount
	// }

	function onBlur(){
		const parsedAmount = Math.min(parseFloat(amount), maxAmount ?? Infinity)
		if(Number.isFinite(parsedAmount))
			amount = parsedAmount
	}

	// $: if(!isFocused)
	// 	textInputValue = String(amount)


	import { Row, Button, Range, Input } from 'framework7-svelte'
	import TokenSelect from './TokenSelect.svelte'
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
		{onBlur}
	/>
	<!-- autofocus -->

	<!-- <Input
		type="number"
		clearButton
		autofocus
		placeholder="0"
		bind:value={textInputValue}
		onFocus={() => isFocused = true}
		onBlur={() => isFocused = false}
	/> -->
	{#if availableTokens}
		<TokenSelect
			bind:token
			{availableTokens}
		/>
	{:else}
		<span>{token.symbol}</span>
	{/if}
</div>

{#if showSlider}
	<!-- <Row>
		<Button small fill color="gray" onClick={() => amount = 0.10 * maxAmount}>10%</Button>
		<Button small fill color="gray" onClick={() => amount = 0.25 * maxAmount}>25%</Button>
		<Button small fill color="gray" onClick={() => amount = 0.50 * maxAmount}>50%</Button>
		<Button small fill color="gray" onClick={() => amount = 0.75 * maxAmount}>75%</Button>
		<Button small fill color="gray" onClick={() => amount = 1.00 * maxAmount}>max</Button>
	</Row> -->

	<Range
		value={amount} onRangeChange={_ => amount = _}
		min={0}
		max={maxAmount}
		color={token.color}
		scale={true}
		scaleSteps={4}
		scaleSubSteps={2}
		formatScaleLabel={value => value.toFixed(1)}
	/>
	<!-- style="--f7-range-knob-background-image: url('{token.image}')" -->
	<!-- formatScaleLabel={value => value === maxAmount ? 'max' : value.toFixed(1)} -->
{/if}