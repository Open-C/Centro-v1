<script>
	import { quoteCurrency } from '../data/settings'
	import { tokenBalances } from '../data/tokenBalances'
	import { tokenPricesUSD } from '../data/tokenPrices'


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
	

	import { formatValue } from '../utils/formatValue'
	import { formatPercent } from '../utils/formatPercent'


	import { List, ListItem, Badge, Icon } from 'framework7-svelte'
</script>


<List {...listProps}>
	{#each tokens as token}
		<ListItem accordionItem={$$props.accordionList}
			title={token.name}
			footer="{tokenBalances[token.symbol]?.amount ?? 0} {token.symbol}"

			link={link ? link(token) : undefined}
			onClick={onClick ? () => onClick(token) : undefined}

			{radio}
			checked={checked ? checked(token) : false}

			style="
				--f7-theme-color: {token.color}
			"
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

			<div slot="after">
				<mark class="value">{formatValue((tokenBalances[token.symbol]?.amount ?? 0) * (tokenPricesUSD[token.symbol] ?? 0), $quoteCurrency)}</mark>
				<span class="after-footer">
					<slot name="after-footer" {token}>
						+{formatPercent(0.005)} (+{formatValue(100, $quoteCurrency)})
					</slot>
				</span>
			</div>

			<slot {token} />
		</ListItem>
	{/each}
</List>