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


<TabLayout tabs={{'request': 'Request', 'send': 'Send'}} let:tab>
	{#if tab === 'request'}
		<Block inset strong>
			<TokenDeposit
				token={depositToken}
				maxAmount={maxDepositAmount}
			/>
		</Block>
	{:else if tab === 'send'}
		<Block inset strong>
			<TokenWithdraw
				token={withdrawToken}
				maxAmount={maxWithdrawAmount}
			/>
		</Block>
	{/if}
</TabLayout>