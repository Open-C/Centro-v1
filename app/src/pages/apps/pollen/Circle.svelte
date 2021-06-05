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


	import { AccordionContent, AccordionItem, Badge, Block, BlockTitle, Button, Icon, List, ListItem, Navbar, Page, Progressbar, Row } from 'framework7-svelte'
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
				<div class="line">
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
				</div>
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
							<p>
								<Progressbar progress={70} />
							</p>
						</svelte:fragment>
					</ListItem>
				{/each}
			</List>

		{:else if tab === 'proposals'}
			<BlockTitle medium>Outstanding Proposals</BlockTitle>
			<List inset
				sortable
				sortableTapHold
				mediaList
			>
				{#each circle.proposals as proposal}
					<ListItem
						title={proposal.member.name}
						footer={proposal.description}
						accordionItem
					>
						<Icon slot="media" f7="person_crop_circle_badge" />

						<svelte:fragment slot="after">
							{formatValue(proposal.amount, $quoteCurrency)}
							<span class="after-footer">
								{proposal.type}
							</span>
						</svelte:fragment>

						<AccordionContent>
							<Block>
								<Row>
									<Button fill>Vote to Approve</Button>
									<Button fill>Vote to Deny</Button>
								</Row>
							</Block>
						</AccordionContent>
					</ListItem>
				{:else}
					<ListItem>
						There aren't any outstanding proposals.
					</ListItem>
				{/each}
			</List>

			<List inset>
				<ListItem
					title={'Create new proposal...'}
					link={'propose'}
				>
					<svelte:fragment slot="media">
						<Icon f7="plus_circle" />
					</svelte:fragment>
				</ListItem>
			</List>

			{#if circle.pastProposals?.length}
				<BlockTitle medium>Past Proposals</BlockTitle>
				<List inset
					sortable
					sortableTapHold
					mediaList
				>
					{#each circle.pastProposals as proposal}
						<ListItem
							title={proposal.member.name}
							footer={proposal.description}
							accordionItem
						>
							<Icon slot="media" f7="person_crop_circle_badge" />

							<svelte:fragment slot="after">
								{formatValue(proposal.amount, $quoteCurrency)}
								<span class="after-footer">
									{proposal.type}
								</span>
							</svelte:fragment>
						</ListItem>
					{/each}
				</List>
			{/if}

		{:else if tab === 'debts'}
			<List inset
				sortable
				sortableTapHold
				mediaList
			>
				{#each circle.debts as debt}
					<ListItem
						title={debt.member.name}
						footer={debt.description}
					>
						<Icon slot="media" f7="person_crop_circle_badge" />

						<svelte:fragment slot="after">
							{formatValue(debt.amount, $quoteCurrency)}
							<span class="after-footer">
								{debt.type}
							</span>
						</svelte:fragment>

						<svelte:fragment slot="footer">
							<p>
								<Progressbar progress={70} />
							</p>
						</svelte:fragment>
					</ListItem>
				{/each}
			</List>
		{/if}
	</TabLayout>
</Page>