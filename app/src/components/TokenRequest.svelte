<script>
	export let token
	
	
	const transactionAction = 'Request'
	let amount


	let requestStarted = false


	import { Block, Button, Sheet, PageContent } from 'framework7-svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
</script>


<TokenAmountSelect
	action={transactionAction}
	{token}
	bind:amount
	showSlider={false}
/>
<hr>
<Button large fill
	onClick={() => requestStarted = true}
	disabled={!(amount)}>
	{transactionAction}
</Button>


<Sheet
	class="request-sheet swipe-handle"
	opened={requestStarted}
	onSheetClosed={() => requestStarted = false}
	swipeToClose
	swipeToStep
	backdrop
>
	<PageContent>
		<Block>
			<h2>Show this QR code to receive tokens.</h2>
			<img alt="QR Code" width="200" height="200" />
		</Block>
		<Block>
			<Button large fill sheetClose>Done</Button>
		</Block>
	</PageContent>
</Sheet>