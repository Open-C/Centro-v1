<script>
	export let token


	import { tokenBalances } from '../data/tokenBalances'

	let maxAmount = tokenBalances[token.symbol]?.amount


	import { Block } from 'framework7-svelte'
	import TabLayout from './TabLayout.svelte'
	import TokenRequest from './TokenRequest.svelte'
	import TokenSend from './TokenSend.svelte'
</script>


<TabLayout
	tabs={{
		... {'request': 'Request'},
		... maxAmount ? {'send': 'Send'} : {}
	}}
	let:tab
>
	{#if tab === 'request'}
		<Block inset strong>
			<TokenRequest {token} />
		</Block>
	{:else if tab === 'send'}
		<Block inset strong>
			<TokenSend
				token={token}
				{maxAmount}
			/>
		</Block>
	{/if}
</TabLayout>