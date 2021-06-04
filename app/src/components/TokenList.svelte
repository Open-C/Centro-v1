<script>
	import { tokenBalances } from '../data/tokenBalances'


	export let tokens = []


	// <ListItem>
	export let link // Token => string
	export let onClick // Token => string
	// export let onChange // Token => string
	export let checked // Token => boolean
	export let radio // boolean


	// <List>
	var _
	$: ({tokens: _, link: _, onClick: _, checked: _, ...listProps} = $$props)
	

	import { List, ListItem, Badge, Icon } from 'framework7-svelte'
</script>


<List {...listProps}>
	{#each tokens as token}
		<ListItem accordionItem={$$props.accordionList}
			title={token.name}
			footer={token.symbol}
			after={tokenBalances[token.symbol]?.amount || 0}

			link={link ? link(token) : undefined}
			onClick={onClick ? () => onClick(token) : undefined}

			{radio}
			checked={checked ? checked(token) : false}
		>
		<!-- onChange={onChange ? () => onChange(token) : undefined} -->
			<!-- <img slot="media" src={token.logoURI} height="40" /> -->
			<svelte:fragment slot="media">
				<Icon>
					<img src={token.logoURI} height="40" />
					{#if checked ? checked(token) : false}
						<Badge color><Icon size="0.9em" f7="checkmark" /></Badge>
					{/if}
				</Icon>
			</svelte:fragment>

			<slot {token} />
		</ListItem>
	{/each}
</List>