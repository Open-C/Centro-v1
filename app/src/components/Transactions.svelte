<script>
	import { quoteCurrency } from '../data/settings'
	
	
	export let transactions


	import { actionVerbs } from '../data/actions'
	import { formatValue } from '../utils/formatValue'


	import { Block, List, ListItem, Button, AccordionContent } from 'framework7-svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>

<List accordionList inset>
	{#each transactions as transaction}
		<ListItem accordionItem
			title="{actionVerbs[transaction.action].pastTense} {formatValue(transaction.amount, transaction.token.symbol)}"
			footer={new Date(transaction.timestamp).toLocaleDateString()}
			style="
				--f7-theme-color: {transaction.token.color}
			"
		>
			<svelte:fragment slot="media">
				<TokenIcon token={transaction.token} />
			</svelte:fragment>

			<div slot="after">
				<mark class="value">{formatValue(transaction.price * transaction.amount, $quoteCurrency)}</mark>
				<span class="after-footer">
					Price: {formatValue(transaction.price, $quoteCurrency)}
				</span>
			</div>

			<AccordionContent>
				<Block>
					<Button fill>View in Block Explorer</Button>
				</Block>
			</AccordionContent>
		</ListItem>
	{:else}
		<ListItem>
			No past transactions.
		</ListItem>
	{/each}
</List>

