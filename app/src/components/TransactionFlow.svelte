<script>
	export let transactionAction
	export let token = {}
	export let fromAddress
	export let toAddress
	export let amount


	export let isOpen = false


	import { createTransactionStore } from '../data/transaction'
	const transactionStore = createTransactionStore()
	import { useStore } from 'framework7-svelte'
	let status = useStore(transactionStore, 'status', _ => status = _)
	let transactionID = useStore(transactionStore, 'transactionID', _ => transactionID = _)

	import { walletStore } from '../data/wallet'
	let provider = useStore(walletStore, 'provider', _ => provider = _)


	import { getContext } from 'svelte'
	let f7router = getContext('f7router')
	
	
	import { Button, Sheet, Block, Row, Icon, Link, Preloader, Toolbar } from 'framework7-svelte'
	import Address from './Address.svelte'
</script>


<Sheet
	class="transaction-sheet"
	opened={isOpen}
	onSheetClosed={() => isOpen = false}
	swipeToClose
	swipeToStep
	backdrop
>
	{#if status === 'created'}
		<Toolbar>
			<div class="left"></div>
			<div class="right">
				<Link sheetClose>Cancel</Link>
			</div>
		</Toolbar>
	{/if}

	<div class="sheet-modal-swipe-step">
		<Block>
			<Row>
				<h2>{transactionAction}</h2>
				<span><img src={token.image} width="20" /> {amount} {token.symbol}</span>
			</Row>
			{#if fromAddress}
				<Row><h3>From</h3> <Address address={fromAddress} /></Row>
			{/if}
			{#if toAddress}
				<Row><h3>To</h3> <Address address={toAddress} /></Row>
			{/if}
		</Block>

		<Block>
			{#if status === 'created'}
				<Button large fill onClick={() => transactionStore.dispatch('sign')}>Sign Transaction</Button>
				<!-- <Button fill color="gray" sheetClose>Cancel</Button> -->
			{:else if status === 'signing'}
				<p>
					<Preloader />
					<strong>Signing transaction with {provider}...</strong>
				</p>
			{:else if status === 'rejected'}
				<h3>There was a problem signing the transaction.</h3>
				<!-- <samp>{error}</samp> -->
				<Button large onPress={() => transactionStore.dispatch('retry')}>Retry</Button>
				<Button onPress={() => transactionStore.dispatch('cancel')} sheetClose>Cancel</Button>
			{:else if status === 'pending'}
				<p>
					<Preloader />
					<strong>Waiting for transaction to be confirmed...</strong>
				</p>
			{:else if status === 'confirmed'}
				<p>
					<Icon f7="checkmark_circle_fill" color="green" />
					<strong>Transaction confirmed!</strong>
				</p>
				<Button fill onClick={() => f7router.navigate('/explorer/', { props: transactionID })} sheetClose>View Transaction</Button>
				<Button fill sheetClose>Done</Button>
			{/if}
		</Block>
	</div>

	<!-- <div>wheeee</div> -->
</Sheet>