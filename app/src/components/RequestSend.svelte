<script>
	export let token


	let mode = 'None'


	import { tokenBalances } from '../data/tokenBalances'


	import { Block, Row, Button } from 'framework7-svelte'
	import TokenRequest from './TokenRequest.svelte'
	import TokenSend from './TokenSend.svelte'
</script>

{#if mode === 'None'}
	<Row>
		<Button fill onClick={() => mode = 'Request'}>Request</Button>
		<Button fill onClick={() => mode = 'Send'}>Send</Button>
	</Row>
{:else if mode === 'Request'}
	<TokenRequest {token} />
{:else if mode === 'Send'}
	<TokenSend
		token={token}
		maxAmount={tokenBalances[token.symbol].amount}
	/>
{/if}