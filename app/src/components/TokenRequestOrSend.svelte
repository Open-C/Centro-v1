<script>
	export let token


	import { tokenBalances } from '../data/tokenBalances'


	import { Block } from 'framework7-svelte'
	import TabLayout from './TabLayout.svelte'
	import TokenRequest from './TokenRequest.svelte'
	import TokenSend from './TokenSend.svelte'
</script>


<TabLayout tabs={{'request': 'Request', 'send': 'Send'}} let:tab>
	{#if tab === 'request'}
		<Block inset strong>
			<TokenRequest {token} />
		</Block>
	{:else if tab === 'send'}
		<Block inset strong>
			<TokenSend
				token={token}
				maxAmount={tokenBalances[token.symbol].amount}
			/>
		</Block>
	{/if}
</TabLayout>