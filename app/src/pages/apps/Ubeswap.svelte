<script>
	import { tokens } from '../../data/tokens'


	import { Page, Navbar, Block, NavTitle } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
	import TokenSwap from '../../components/TokenSwap.svelte'
</script>

<Page>
	<Navbar sliding={false} backLink="Apps">
		<NavTitle slot="title" sliding>
			<img src={require('../../static/images/ubeswap-logo.png').default} alt="Ubeswap" height={30} />
			Ubeswap
		</NavTitle>

		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar>

	
	<TokenSwap
		availableTokens={tokens}
	/>
</Page>
