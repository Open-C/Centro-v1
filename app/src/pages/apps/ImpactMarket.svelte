<script>
	import { Page, Navbar } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
</script>

<Page>
	<Navbar title="Impact Market" backLink="Apps" />
	<!-- <Navbar title="Impact Market" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar> -->
</Page>
