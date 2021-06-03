<script>
	export let action = 'Send'
	export let availableTokens = undefined
	export let token = availableTokens?.[0] ?? {}
	export let maxAmount
	export let amount


	export let showSlider = true


	let sheetComponent
	$: sheet = sheetComponent?.instance()


	let isFocused = false

	$: if(sheet) isFocused ? sheet.open() : sheet.close()

	function onFocus(){
		isFocused = true
	}

	function onBlur(){
		isFocused = false

		const parsedAmount = Math.min(parseFloat(amount), maxAmount ?? Infinity)
		if(Number.isFinite(parsedAmount))
			amount = parsedAmount
	}


	import { Block, Row, Button, Range, Input, Toolbar, Sheet } from 'framework7-svelte'
	import TokenSelect from './TokenSelect.svelte'
</script>

<style>
	.token-amount-select :global(.token-amount-input) {
		--f7-input-font-size: 1.25rem;
		--f7-input-height: calc(var(--f7-input-font-size) * 2);
	}

	.token-amount-select :global(.token-amount-input input) {
		font-weight: 600;
		text-align: center;
	}
</style>

<div class="line token-amount-select">
	<h3>{action}</h3>

	<Input
		type="number"
		class="token-amount-input"
		bind:value={amount}
		min={0}
		max={maxAmount}
		placeholder="0"
		clearButton
		{onFocus}
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
	{#if maxAmount}
		<Sheet
			bind:this={sheetComponent}
			class="buttons-sheet"
			push
		>
		<!-- opened={isFocused || undefined} -->
			<Block>
				<Row>
					<Button small fill color="gray" onClick={e => {amount = 0.10 * maxAmount; e.preventDefault()}}>10%</Button>
					<Button small fill color="gray" onClick={() => amount = 0.25 * maxAmount}>25%</Button>
					<Button small fill color="gray" onClick={() => amount = 0.50 * maxAmount}>50%</Button>
					<Button small fill color="gray" onClick={() => amount = 0.75 * maxAmount}>75%</Button>
					<Button small fill color="gray" onClick={() => amount = 1.00 * maxAmount}>max</Button>
				</Row>
			</Block>
		</Sheet>
	{/if}

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