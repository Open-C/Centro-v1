<script>
	export let depositToken
	export let maxDepositAmount
	export let withdrawToken
	export let maxWithdrawAmount


	import { tokenBalances } from '../data/tokenBalances'


	import { Block } from 'framework7-svelte'
	import TabLayout from './TabLayout.svelte'
	import TokenDeposit from './TokenDeposit.svelte'
	import TokenWithdraw from './TokenWithdraw.svelte'
</script>


<TabLayout
	tabs={{
		... maxDepositAmount ? {'deposit': maxWithdrawAmount ? 'Deposit More' : 'Deposit'} : {},
		... maxWithdrawAmount ? {'withdraw': 'Withdraw'} : {}
	}}
	let:tab
>
	{#if tab === 'deposit'}
		<Block inset strong>
			<TokenDeposit
				token={depositToken}
				maxAmount={maxDepositAmount}
			/>
		</Block>
	{:else if tab === 'withdraw'}
		<Block inset strong>
			<TokenWithdraw
				token={withdrawToken}
				maxAmount={maxWithdrawAmount}
			/>
		</Block>
	{/if}
</TabLayout>