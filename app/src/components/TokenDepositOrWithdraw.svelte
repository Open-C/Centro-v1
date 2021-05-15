<script>
	export let depositToken
	export let maxDepositAmount
	export let withdrawToken
	export let maxWithdrawAmount


	let mode = 'None'


	import { tokenBalances } from '../data/tokenBalances'


	import { Row, Button } from 'framework7-svelte'
	import TokenDeposit from './TokenDeposit.svelte'
	import TokenWithdraw from './TokenWithdraw.svelte'
</script>

{#if mode === 'None'}
	<Row>
		<Button fill onClick={() => mode = 'Deposit'}>Deposit</Button>
		<Button fill onClick={() => mode = 'Withdraw'}>Withdraw</Button>
	</Row>
{:else if mode === 'Deposit'}
	<TokenDeposit
		token={depositToken}
		maxAmount={maxDepositAmount}
	/>
{:else if mode === 'Withdraw'}
	<TokenWithdraw
		token={withdrawToken}
		maxAmount={maxWithdrawAmount}
	/>
{/if}