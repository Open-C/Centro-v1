<script>
	export let token
	export let maxBorrowAmount
	export let maxRepayAmount


	import { Block } from 'framework7-svelte'
	import TabLayout from './TabLayout.svelte'
	import TokenBorrow from './TokenBorrow.svelte'
	import TokenRepay from './TokenRepay.svelte'
</script>


<TabLayout
	tabs={{
		... maxBorrowAmount ? {'borrow': maxRepayAmount ? 'Borrow More' : 'Borrow'} : {},
		... maxRepayAmount ? {'repay': 'Repay'} : {}
	}}
	let:tab
>
	{#if tab === 'borrow'}
		<Block inset strong>
			<TokenBorrow
				{token}
				maxAmount={maxBorrowAmount}
			/>
		</Block>
	{:else if tab === 'repay'}
		<Block inset strong>
			<TokenRepay
				token={token}
				maxAmount={maxRepayAmount}
			/>
		</Block>
	{/if}
</TabLayout>