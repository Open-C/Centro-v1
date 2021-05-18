<script>
	export let token
	
	
	const transactionAction = 'Request'
	let fromAddress
	let amount


	let transactionStarted = false


	import { Button } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
	import RecipientSelect from './RecipientSelect.svelte'
	import TransactionFlow from './TransactionFlow.svelte'
</script>


<TokenAmountSelect
	action={transactionAction}
	{token}
	bind:amount
	showSlider={false}
/>
<hr>
<RecipientSelect
	preposition={'From'}
	bind:address={fromAddress}
/>
<hr>
<Button fill
	onClick={() => transactionStarted = true}
	disabled={!(amount && fromAddress)}>
	{transactionAction}
</Button>


<TransactionFlow
	bind:isOpen={transactionStarted}
	{transactionAction}
	{token}
	{fromAddress}
	{amount}
/>