<script>
	export let token
	export let maxAmount


	let amount = maxAmount
	let address = ''

	
	import { Button } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
	import RecipientSelect from './RecipientSelect.svelte'
</script>

<TokenAmountSelect
	action="Send"
	token={token}
	maxAmount={maxAmount}
	bind:amount
/>
<RecipientSelect bind:address />
<Button fill>Send</Button>