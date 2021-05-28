<script>
	export let token
	export let maxAmount


	const transactionAction = 'Borrow'
	let amount = maxAmount


	let transactionStarted = false

	
	import { Button } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
	import TransactionFlow from './TransactionFlow.svelte'
</script>


<TokenAmountSelect
	action={transactionAction}
	{token}
	{maxAmount}
	bind:amount
/>
<hr>
<Button fill
	onClick={() => transactionStarted = true}
	disabled={!(amount)}>
	{transactionAction}
</Button>


<TransactionFlow
	bind:isOpen={transactionStarted}
	{transactionAction}
	{token}
	{amount}
/>