<script>
	export let availableTokens
	export let maxAmount


	const transactionAction = 'Deposit'
	export let token1 = availableTokens[0]
	let token1Amount = maxAmount
	export let token2Amount = availableTokens[1]
	let toAmount


	let exchangeRate
	$: {
		exchangeRate = 5.01
	}


	let depositIntoRewardsPool = true


	let transactionStarted = false


	function reverseDirection(){
		[token1, token2Amount] = [token2Amount, token1];
		[token1Amount, toAmount] = [toAmount, token1Amount]
	}


	import { formatValue } from '../utils/formatValue'
	import { formatPercent } from '../utils/formatPercent'

	
	import { Block, BlockTitle, Button, Icon, List, ListItem, Toggle } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
	import TransactionFlow from './TransactionFlow.svelte'
</script>


<Block strong inset>
	<TokenAmountSelect
		action={'Deposit'}
		availableTokens={availableTokens.filter(token => token !== token2Amount)}
		bind:token={token1}
		bind:amount={token1Amount}
	/>
</Block>
<Block>
	<div class="line">
		<p class="conversion">
			<span>{formatValue(exchangeRate, token2Amount.symbol, 5)}</span>
			<span> = </span>
			<span>1 {token1.symbol}</span>
		</p>
		<Button onClick={reverseDirection}>
			<Icon f7="plus" />
		</Button>
		<p class="conversion">
			<span>{formatValue(1 / exchangeRate, token1.symbol, 5)}</span>
			<span> = </span>
			<span>1 {token2Amount.symbol}</span>
		</p>
	</div>
</Block>
<Block strong inset>
	<TokenAmountSelect
		action={'Deposit'}
		availableTokens={availableTokens.filter(token => token !== token1)}
		bind:token={token2Amount}
		bind:amount={toAmount}
	/>
</Block>

<BlockTitle>Yield Farming/Liquidity Mining</BlockTitle>
<List accordionList noHairlines inset>
	<ListItem title="Earn UBE Rewards" footer="Yield/day: {formatPercent(0.011)}">
		<Toggle bind:checked={depositIntoRewardsPool} />
	</ListItem>
</List>

<Block>
	<Button large fill
		onClick={() => transactionStarted = true}
		disabled={!(token1 && token2Amount && token1Amount)}>
		{transactionAction}
	</Button>
</Block>


<TransactionFlow
	bind:isOpen={transactionStarted}
	{transactionAction}
	amount={token1Amount}
/>


<style>
	.conversion {
		opacity: 0.8;
		text-align: center;
		font-size: 0.8em;
	}
</style>