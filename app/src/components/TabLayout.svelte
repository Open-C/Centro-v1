<script context="module">
	let id = 0
</script>


<script>
	let tabInstanceID = id++


	export let tabs = {} // Record<id, title>

	export let animated = false
	export let swipeable = false
	export let routable = false
	export let swiperParams = false


    import { Button, Segmented, Tab, Tabs } from 'framework7-svelte'
</script>


<Segmented strong>
	{#each Object.entries(tabs) as [tabID, title] (tabID)}
		<Button tabLink="#{tabID}-{tabInstanceID}">{title}</Button>
	{/each}
</Segmented>

<Tabs {animated} {swipeable} {routable} {swiperParams}>
	{#each Object.entries(tabs) as [tabID, title] (tabID)}
		<Tab id="{tabID}-{tabInstanceID}">
			<slot tab={tabID} />
		</Tab>
	{/each}
</Tabs>