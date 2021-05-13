<script>
	import { Page, Navbar, Block, BlockTitle } from 'framework7-svelte'
</script>

<Page>
	<Navbar backLink="Apps">
		<slot name="title">
			<img src={require('../../static/images/moola-logo.png').default} alt="MoolaMarket" height={30} />
		</slot>
	</Navbar>
</Page>
