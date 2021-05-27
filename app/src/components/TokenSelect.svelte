<script>
	export let availableTokens = undefined
	export let token = availableTokens?.[0] ?? {}


	import { ListItem, List, Icon } from 'framework7-svelte'
</script>


<!-- <select bind:value={token}>
	{#each availableTokens as token}
		<option value={token}>{token.symbol}</option>
	{/each}
</select> -->

<List
	ul={false}
	noHairlines
	noChevron
	class="inline-smart-select"
>
	<ListItem
		li={false}
		smartSelect
		smartSelectParams={{
			openIn: 'sheet',
			sheetSwipeToClose: true,
			sheetPush: true,

			// openIn: 'popup',
			searchbar: true,
			searchbarPlaceholder: 'Search Tokens',
			scrollToSelectedItem: true,

			// openIn: 'popover',

			closeOnSelect: true
		}}
		after="Non"
	>
		<!-- <svelte:fragment slot="after">
			<Icon f7="chevron_down" />
		</svelte:fragment> -->

		<!-- <span>{token.symbol}</span> -->
		<Icon size="0.85em" f7="chevron_down" />

		<select value={token.symbol} on:change={e => token = ({symbol: e.target.value})}>
			{#each availableTokens as token}
				<option value={token.symbol}>{token.symbol}</option>
			{/each}
		</select>
	</ListItem>
</List>