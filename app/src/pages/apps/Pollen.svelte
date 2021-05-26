<script>
	import { pollenCircles } from '../../data/pollen'
	

	let mode


	import { Page, Navbar, Block, Progressbar, ListItem, BlockTitle, List, Segmented, Button, Icon } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
</script>

<Page>
	<Navbar title="Pollen" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar>

	<!-- <h1>Circle Balances: {972.65}</h1>
	
	{#each circles as {
		name,
		governanceModel,
		depositMinimum,
		period,
		latePenalty,
		balance,
		periodTimeRemaining,
		members,
		proposals,
		debts,
	}}
		<Block inset strong>
			<h2>{name}</h2>
			<p>Balance: {balance}</p>
			<p>{periodTimeRemaining} days to contribute</p>
			<Progressbar progress={70} />
		</Block>
	{/each} -->

	{#if $pollenCircles.length}
		<BlockTitle>Circle Balances: {972.65}</BlockTitle>
		<List inset
			sortable
			sortableTapHold
			mediaList
		>
			{#each $pollenCircles as {
				id,
				name,
				governanceModel,
				depositMinimum,
				period,
				latePenalty,
				balance,
				periodTimeRemaining,
				members,
				proposals,
				debts,
			}}
				<ListItem
					title={name}
					after={balance}
					link={id}
				>
					<!-- badge={proposals.length} -->
					<svelte:fragment slot="footer">
						<p>{periodTimeRemaining} days to contribute</p>
						<Progressbar progress={70} />
					</svelte:fragment>
				</ListItem>

				<!-- <ListItem
					header="{periodTimeRemaining} days to contribute"
					title={name}
					footer={balance}
					link={id}
					badge={proposals.length}
				>
					<svelte:fragment slot="footer">
						<p></p>
						<Progressbar progress={70} />
					</svelte:fragment>
				</ListItem> -->
			{/each}
			<!-- <ListItem
			>
				<Segmented strong>
					<Button active={mode === 'Join'} onClick={() => mode = 'Join'}>Join</Button>
					<Button active={mode === 'Start'} onClick={() => mode = 'Start'}>Start</Button>
				</Segmented>
			</ListItem> -->
		</List>
	{/if}

	<List inset>
		<ListItem
			title={'Start new circle...'}
			link={'start'}
		>
			<svelte:fragment slot="media">
				<Icon f7="plus_circle" />
			</svelte:fragment>
		</ListItem>
		<ListItem
			title={'Join existing circle...'}
			link={'join'}
		>
			<svelte:fragment slot="media">
				<Icon f7="person_crop_circle_fill_badge_plus" />
			</svelte:fragment>
		</ListItem>
	</List>
</Page>
