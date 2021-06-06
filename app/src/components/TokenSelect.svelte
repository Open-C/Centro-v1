<script>
	export let availableTokens = undefined
	export let selectedToken = availableTokens?.[0] ?? {}


	let sheetComponent
	$: sheet = sheetComponent?.instance()

	let isSelecting
	$: isSelecting ? sheet?.open() : sheet?.close()


	import { tokenBalances } from '../data/tokenBalances'
	import { tokenPricesUSD } from '../data/tokenPrices'
	import { sortTokensByBalance } from '../utils/sortTokensByBalance'


	import { Button, ListItem, List, Icon, Sheet, Searchbar, Toolbar, PageContent } from 'framework7-svelte'
	import TokenList from './TokenList.svelte'
</script>


<!-- <select bind:value={token}>
	{#each availableTokens as token}
		<option value={token}>{token.symbol}</option>
	{/each}
</select> -->

<!--
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
			// searchbar: true,
			// searchbarPlaceholder: 'Search Tokens',
			// scrollToSelectedItem: true,

			// openIn: 'popover',

			closeOnSelect: true
		}}
		after=""
	>
		<!-- <svelte:fragment slot="after">
			<Icon f7="chevron_down" />
		</svelte:fragment> -- >

		<!-- <span>{selectedToken.symbol}</span> -- >
		<Icon size="0.85em" f7="chevron_down" />

		<select value={selectedToken.symbol} on:change={e => selectedToken = ({symbol: e.target.value})}>
			{#each availableTokens as token}
				<option value={token.symbol}>{token.symbol}</option>
			{/each}
		</select>
	</ListItem>
</List> -->

<Button class="token-select-button" onClick={() => isSelecting = true}>
	<img src={selectedToken.logoURI} height="25" />
	{selectedToken.symbol}
	<Icon size="0.85em" f7="chevron_down" />
</Button>

<Sheet
	bind:this={sheetComponent}
	class="swipe-handle"
	opened={isSelecting}
	onSheetClosed={() => isSelecting = false}
	swipeToClose
	swipeToStep
	backdrop
>
<!-- opened={isSelecting} -->
	<!-- <Toolbar> -->
		<Searchbar
			placeholder={'Search Tokens'}
			searchContainer=".token-list"
		/>
	<!-- </Toolbar> -->
	
	<div class="sheet-modal-swipe-step" style="overflow:auto; max-height: 300px">
	<!-- <PageContent> -->
		<TokenList
			class="token-list"

			tokens={sortTokensByBalance(availableTokens, tokenBalances, tokenPricesUSD)}

			onClick={async token => {
				selectedToken = token
				await new Promise(r => setTimeout(r), 100)
				isSelecting = false
			}}
			checked={selectedToken, token => selectedToken === token}

			let:token
		>
		<!-- radio -->
		</TokenList>
	<!-- </PageContent> -->
	</div>

	<!-- <Button>Custom</Button> -->
</Sheet>


<style>
	:global(.token-select-button) {
		color: inherit;
		margin: 0 calc(-1 * var(--f7-button-padding-horizontal));
		padding: 0 calc(0.5 * var(--f7-button-padding-horizontal));
		text-transform: none;
	}
	:global(.token-select-button .icon) {
		margin: 0.33em;
	}
</style>