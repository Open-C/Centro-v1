<script>
	export let f7router
	export let f7route


	let pollenID
	import { onMount } from 'svelte'
	onMount(() => {
		pollenID = f7route.params.pollenID
	})


	import { Navbar, Page } from 'framework7-svelte'
</script>

<Page>
	<Navbar	title="Pollen Circle" backLink="Pollen">
	</Navbar>

	<h1>#{pollenID}</h1>
</Page>