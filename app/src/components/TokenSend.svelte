<script>
	export let token
	export let maxAmount


	const transactionAction = 'Send'
	let toAddress = ''
	let amount = maxAmount


	let transactionStarted = false

	
	import { Button } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
	import RecipientSelect from './RecipientSelect.svelte'
	import TransactionFlow from './TransactionFlow.svelte'
</script>


<TokenAmountSelect
	action={transactionAction}
	{token}
	{maxAmount}
	bind:amount
/>
<hr>
<RecipientSelect
	bind:address={toAddress}
/>
<hr>
<Button fill
	onClick={() => transactionStarted = true}
	disabled={!(amount && toAddress)}>
	{transactionAction}
</Button>


<!-- {#if transactionStarted} -->
	<TransactionFlow
		bind:isOpen={transactionStarted}
		{transactionAction}
		{token}
		{toAddress}
		{amount}
	/>
<!-- {/if} -->