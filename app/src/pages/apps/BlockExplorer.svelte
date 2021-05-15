<script>
	export let transactionID
	export let blockNumber

	const uri =
		transactionID ?
			`https://explorer.celo.org/tx/${transactionID}`
		: blockNumber ?
			`https://explorer.celo.org/blocks/${blockNumber}`
		:
			`https://explorer.celo.org`


	import { Page, Navbar } from 'framework7-svelte'
</script>

<Page>
	<Navbar title="Block Explorer" backLink="Apps">
	</Navbar>

	<iframe title="Celo Block Explorer" src={uri} />
</Page>
