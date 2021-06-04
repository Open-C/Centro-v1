<script>
	export let f7route


	import { quoteCurrency } from '../../../data/settings'


	import { pollenCircles } from '../../../data/pollen'

	let pollenCircleID = f7route.params.pollenCircleID
	// import { onMount } from 'svelte'
	// onMount(() => {
	// 	pollenCircleID = f7route.params.pollenCircleID
	// 	console.log(f7router, f7route)
	// })

	$: circle = $pollenCircles.find(circle => circle.id == pollenCircleID) || {}


	import { formatValue } from '../../../utils/formatValue'


	import { Block, Icon, List, ListItem, Navbar, Page, Progressbar, Row } from 'framework7-svelte'
	import TabLayout from '../../../components/TabLayout.svelte'
</script>


<Page>
	<Navbar	title="{circle.name}" backLink="Pollen">
	</Navbar>

	<TabLayout
		swipeable
		tabs={{
			'deposits': 'Deposits',
			'proposals': 'Proposals',
			'debts': 'Debts'
		}}
		let:tab
	>
		{#if tab === 'deposits'}
			<Block inset strong>
				<Row>
					<div>
						<h3>Circle Reserve</h3>
						<span>{formatValue(circle.balance, $quoteCurrency)}</span>
					</div>
					<div>
						<h3>Period Ends In</h3>
						<span>{circle.periodTimeRemaining} days</span>
					</div>
					<div>
						<h3>Interest Earned</h3>
						<span>{circle.earned}</span>
					</div>
				</Row>
			</Block>

			<List inset
				sortable
				sortableTapHold
				mediaList
			>
				{#each circle.members as member}
					<ListItem
						title={member.name}
						after={formatValue(member.balance, $quoteCurrency)}
					>
						<Icon slot="media" f7="person_crop_circle_badge" />

						<svelte:fragment slot="footer">
							<Progressbar progress={70} />
						</svelte:fragment>
					</ListItem>
				{/each}
			</List>

		{:else if tab === 'proposals'}
			<List inset
				sortable
				sortableTapHold
				mediaList
			>
				{#each circle.proposals as proposal}
					<ListItem
						title={proposal.member.name}
						after={proposal.type}
						footer={proposal.description}
					>
						<Icon slot="media" f7="person_crop_circle_badge" />

						<svelte:fragment slot="footer">
							<p>{formatValue(proposal.amount, $quoteCurrency)}</p>
						</svelte:fragment>
					</ListItem>
				{/each}
			</List>

		{:else if tab === 'debts'}
			<List inset
				sortable
				sortableTapHold
				mediaList
			>
				{#each circle.debts as debt}
					<ListItem
						title={debt.member.name}
						after={formatValue(debt.amount, $quoteCurrency)}
						footer={debt.description}
					>
						<Icon slot="media" f7="person_crop_circle_badge" />

						<svelte:fragment slot="footer">
							<p>{debt.type}</p>
							<Progressbar progress={70} />
						</svelte:fragment>
					</ListItem>
				{/each}
			</List>
		{/if}
	</TabLayout>
</Page>