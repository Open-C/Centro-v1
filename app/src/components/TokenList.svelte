<script>
	import { tokenBalances } from '../data/tokenBalances'


	export let tokens
	export let link // Token => string
	export let accordionList // boolean


	import { List, ListItem } from 'framework7-svelte'
</script>

<List {accordionList} inset>
	{#each tokens as token}
		<ListItem accordionItem={accordionList}
			link={link ? link(token) : undefined}
			title={token.name}
			footer={token.symbol}
			after={tokenBalances[token.symbol]?.amount || 0}
		>
			<img slot="media" src={token.logoURI} height="40" />
			
			<slot {token} />
		</ListItem>
	{/each}
</List>