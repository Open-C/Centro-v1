<script>
	export let token
	
	
	const transactionAction = 'Request'
	let amount


	let requestStarted = false


	import { Block, Button, Sheet } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
</script>


<TokenAmountSelect
	action={transactionAction}
	{token}
	bind:amount
	showSlider={false}
/>
<hr>
<Button fill
	onClick={() => requestStarted = true}
	disabled={!(amount)}>
	{transactionAction}
</Button>


<Sheet
	class="request-sheet"
	opened={requestStarted}
	onSheetClosed={() => requestStarted = false}
	swipeToClose
	swipeToStep
	backdrop
>
	<Block>
		<h2>Show this QR code to receive tokens.</h2>
		<img alt="QR Code" width="200" height="200" />
	</Block>
	<Block>
		<Button fill sheetClose>Done</Button>
	</Block>
</Sheet>