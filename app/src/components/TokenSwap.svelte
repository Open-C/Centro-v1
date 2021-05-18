<script>
	export let availableTokens
	export let maxAmount


	import { Accordion, AccordionContent, AccordionItem, AccordionToggle, Block, Icon, List, ListItem, Row, Segmented, useStore } from 'framework7-svelte'
	import { walletStore } from '../data/wallet'
	let address = useStore(walletStore, 'address', _ => address = _)


	const transactionAction = 'Swap'
	let fromToken = availableTokens[0]
	let fromAmount = maxAmount
	let toToken = availableTokens[1]
	let toAmount


	let exchangeRate
	$: {
		exchangeRate = 5.01
	}


	let slippage = 0.01


	let transactionStarted = false

	
	import { Button } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
	import TransactionFlow from './TransactionFlow.svelte'
</script>


<TokenAmountSelect
	action={'Send'}
	availableTokens={availableTokens.filter(token => token !== toToken)}
	bind:token={fromToken}
	bind:amount={fromAmount}
/>
<hr>
<TokenAmountSelect
	action={'Receive'}
	availableTokens={availableTokens.filter(token => token !== fromToken)}
	bind:token={toToken}
	bind:amount={toAmount}
	showSlider={false}
/>
{#if fromToken && toToken}
	<Block strong inset>
		<h4>Estimated Rate:</h4>
		<p>1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}</p>
		<p>1 {toToken.symbol} = {1 / exchangeRate} {fromToken.symbol}</p>
	</Block>
{/if}

<!-- <List accordionList noHairlines>
	<ListItem accordionItem title="Advanced">
		<AccordionContent>
			<div class="line">
				<h3>Slippage Tolerance</h3>
				<Segmented strong>
					<Button small active={slippage === 0.005} onClick={() => slippage = 0.005}>0.5%</Button>
					<Button small active={slippage === 0.01} onClick={() => slippage = 0.01}>1%</Button>
					<Button small active={slippage === 0.02} onClick={() => slippage = 0.02}>2%</Button>
				</Segmented>
			</div>
		</AccordionContent>
	</ListItem>
</List> -->
<AccordionItem>
	<AccordionToggle>
		Advanced
		<Icon size="0.85em" f7="chevron_down" />
	</AccordionToggle>
	<AccordionContent>
		<div class="line">
			<h3>Slippage Tolerance</h3>
			<Segmented strong>
				<Button active={slippage === 0.005} onClick={() => slippage = 0.005}>0.5%</Button>
				<Button active={slippage === 0.01} onClick={() => slippage = 0.01}>1%</Button>
				<Button active={slippage === 0.02} onClick={() => slippage = 0.02}>2%</Button>
			</Segmented>
		</div>
	</AccordionContent>
</AccordionItem>

<Button fill
	onClick={() => transactionStarted = true}
	disabled={!(fromToken && toToken && fromAmount)}>
	{transactionAction}
</Button>


<TransactionFlow
	bind:isOpen={transactionStarted}
	{transactionAction}
	amount={fromAmount}
/>