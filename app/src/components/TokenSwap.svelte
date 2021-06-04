<script>
	export let availableTokens
	export let maxAmount


	const transactionAction = 'Swap'
	export let fromToken = availableTokens[0]
	let fromAmount = maxAmount
	export let toToken = availableTokens[1]
	let toAmount


	let exchangeRate
	$: {
		exchangeRate = 5.01
	}


	let slippage = 0.01


	let transactionStarted = false


	function reverseDirection(){
		[fromToken, toToken] = [toToken, fromToken];
		[fromAmount, toAmount] = [toAmount, fromAmount]
	}


	import { formatValue } from '../utils/formatValue'

	
	import { Accordion, AccordionContent, AccordionItem, AccordionToggle, Block, Button, Icon, List, ListItem, Row, Segmented } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
	import TransactionFlow from './TransactionFlow.svelte'
import { formatPercent } from '../utils/formatPercent'
</script>


<Block strong inset>
	<TokenAmountSelect
		action={'Send'}
		availableTokens={availableTokens.filter(token => token !== toToken)}
		bind:token={fromToken}
		bind:amount={fromAmount}
	/>
</Block>
<Block>
	<div class="line">
		<p class="conversion">
			<span>{formatValue(exchangeRate, toToken.symbol, 5)}</span>
			<span> = </span>
			<span>1 {fromToken.symbol}</span>
		</p>
		<Button onClick={reverseDirection}>
			<Icon f7="arrow_down" />
		</Button>
		<p class="conversion">
			<span>{formatValue(1 / exchangeRate, fromToken.symbol, 5)}</span>
			<span> = </span>
			<span>1 {toToken.symbol}</span>
		</p>
	</div>
</Block>
<Block strong inset>
	<TokenAmountSelect
		action={'Receive'}
		availableTokens={availableTokens.filter(token => token !== fromToken)}
		bind:token={toToken}
		bind:amount={toAmount}
		showSlider={false}
	/>
</Block>
<!-- {#if fromToken && toToken}
	<Block strong inset>
		<h4>Estimated Rate:</h4>
		<p>1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}</p>
		<p>1 {toToken.symbol} = {1 / exchangeRate} {fromToken.symbol}</p>
	</Block>
{/if} -->

<List accordionList noHairlines inset>
	<ListItem accordionItem title="Advanced">
		<AccordionContent>
			<Block>
				<div class="line">
					<h4>Slippage Tolerance</h4>
					<Segmented strong>
						{#each [0.005, 0.01, 0.02] as slippageValue}
							<Button small active={slippage === slippageValue} onClick={() => slippage = slippageValue}>{formatPercent(slippageValue, 1)}</Button>
						{/each}
					</Segmented>
				</div>
			</Block>
		</AccordionContent>
	</ListItem>
</List>
<!-- <Block strong inset>
	<AccordionItem>
		<AccordionToggle>
			Advanced
			<Icon size="0.85em" f7="chevron_down" />
		</AccordionToggle>
		<AccordionContent>
			<div class="line">
				<h4>Slippage Tolerance</h4>
				<Segmented strong>
					{#each [0.005, 0.01, 0.02] as slippageValue}
						<Button small active={slippage === slippageValue} onClick={() => slippage = slippageValue}>{formatPercent(slippageValue, 1)}</Button>
					{/each}
				</Segmented>
			</div>
		</AccordionContent>
	</AccordionItem>
</Block> -->

<Block>
	<Button large fill
		onClick={() => transactionStarted = true}
		disabled={!(fromToken && toToken && fromAmount)}>
		{transactionAction}
	</Button>
</Block>


<TransactionFlow
	bind:isOpen={transactionStarted}
	{transactionAction}
	amount={fromAmount}
/>


<style>
	.conversion {
		opacity: 0.8;
		text-align: center;
		font-size: 0.8em;
	}
</style>