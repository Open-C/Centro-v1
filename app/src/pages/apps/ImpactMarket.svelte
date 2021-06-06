<script>
	import { Page, Navbar, NavTitle } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
</script>

<Page>
	<Navbar backLink="Apps">
		<NavTitle>
			Impact Market
			<div class="subtitle">fund UBI initiatives worldwide</div>
		</NavTitle>
	</Navbar>
	<!-- <Navbar title="Impact Market" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar> -->
</Page>
