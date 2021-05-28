<script context="module">
	let id = 0
</script>


<script>
	let tabInstanceID = id++


	export let tabs = {} // Record<id, title>
	export let startTab

	export let animated = false
	export let swipeable = false
	export let routable = false
	export let swiperParams = false


    import { Block, Button, Segmented, Tab, Tabs } from 'framework7-svelte'
</script>


<Block>
	<Segmented strong>
		{#each Object.entries(tabs) as [tabID, title] (tabID)}
			<Button tabLink="#{tabID}-{tabInstanceID}" class={startTab === tabID ? 'tab-link-active' : ''}>{title}</Button>
		{/each}
	</Segmented>
</Block>

<Tabs {animated} {swipeable} {routable} {swiperParams}>
	{#each Object.entries(tabs) as [tabID, title] (tabID)}
		<Tab id="{tabID}-{tabInstanceID}" class={startTab === tabID ? 'tab-active' : ''}>
			<slot tab={tabID} />
		</Tab>
	{/each}
</Tabs>