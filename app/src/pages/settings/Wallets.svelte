<script>
	/*
	import { createWalletStore } from '../../data/wallet'
	let walletStores = [createWalletStore()]
	// $: walletStores.map(walletStore => {
	// 	let status = useStore(walletStore, 'status', _ => status = _)
	// })
	*/


	import { walletMachines } from '../../data/wallets'


	import { Page, Navbar, NavTitle, NavTitleLarge, List, ListItem, Block } from 'framework7-svelte'
	import Wallet from '../../components/Wallet.svelte'
</script>

<Page name="wallets">
	<Navbar large sliding={false} backLink="Back">
		<NavTitle sliding>Wallets</NavTitle>
		<NavTitleLarge>Wallets</NavTitleLarge>
	</Navbar>

	<!-- {#each walletStores as walletMachine}
		<Wallet
			{walletStore}
		/>
	{/each} -->
	{#each walletMachines as walletMachine}
		<Wallet
			{walletMachine}
		/>
	{/each}
</Page>