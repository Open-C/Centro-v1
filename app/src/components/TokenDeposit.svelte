<script>
	export let token
	export let maxAmount


	import { useStore } from 'framework7-svelte'
	import { walletStore } from '../data/wallet'
	let address = useStore(walletStore, 'address', _ => address = _)


	const transactionAction = 'Deposit'
	const fromAddress = address
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
<RecipientSelect
	bind:address={toAddress}
/>
<Button fill
	onClick={() => transactionStarted = true}
	disabled={!(amount && toAddress)}>
	{transactionAction}
</Button>


<TransactionFlow
	bind:isOpen={transactionStarted}
	{transactionAction}
	{token}
	{fromAddress}
	{toAddress}
	{amount}
/>