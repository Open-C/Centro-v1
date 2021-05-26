<script>
	// export let f7router
	export let f7route


	import { pollenCircles } from '../../../data/pollen'

	let pollenCircleID = f7route.params.pollenCircleID
	// import { onMount } from 'svelte'
	// onMount(() => {
	// 	pollenCircleID = f7route.params.pollenCircleID
	// 	console.log(f7router, f7route)
	// })

	$: circle = $pollenCircles.find(circle => circle.id == pollenCircleID) || {}


	import { Block, Button, Col, Icon, List, ListItem, Navbar, Page, Progressbar, Row, Segmented, Subnavbar, Tab, Tabs } from 'framework7-svelte'
</script>

<Page>
	<Navbar	title="{circle.name}" backLink="Pollen">
		<Subnavbar sliding={true}>
			<Segmented strong>
				<Button tabLink="#deposits" tabLinkActive>Deposits</Button>
				<Button tabLink="#proposals">Proposals</Button>
				<Button tabLink="#debts">Debts</Button>
			</Segmented>
		</Subnavbar>
	</Navbar>

	<Tabs swipeable>
		<Tab id="deposits" tabActive>
			<Block inset strong>
				<Row>
					<div>
						<h3>Circle Reserve</h3>
						<span>{circle.balance}</span>
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
						after={member.balance}
					>
						<Icon slot="media" f7="person_crop_circle_badge" />

						<svelte:fragment slot="footer">
							<Progressbar progress={70} />
						</svelte:fragment>
					</ListItem>
				{/each}
			</List>
		</Tab>

		<Tab id="proposals">
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
							<p>{proposal.amount}</p>
						</svelte:fragment>
					</ListItem>
				{/each}
			</List>
		</Tab>

		<Tab id="debts">
			<List inset
				sortable
				sortableTapHold
				mediaList
			>
				{#each circle.debts as debt}
					<ListItem
						title={debt.member.name}
						after={debt.amount}
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
		</Tab>
	</Tabs>
</Page>