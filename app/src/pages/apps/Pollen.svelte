<script>
	import { pollenCircles } from '../../data/pollen'
	import { tokensBySymbol } from '../../data/tokens'
	import { quoteCurrency } from '../../data/settings'
	

	let mode


	import { formatValue } from '../../utils/formatValue'


	import { Page, Navbar, Block, Progressbar, ListItem, BlockTitle, List, Segmented, Button, Icon, Badge } from 'framework7-svelte'
	import CurrentWallet from '../../components/CurrentWallet.svelte'
</script>

<Page style="--f7-theme-color: {tokensBySymbol['CELO'].color}">
	<Navbar title="Pollen" backLink="Apps" />
	<!-- <Navbar title="Pollen" backLink="Apps">
		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar> -->

	<!-- <h1>Circle Balances: {formatValue(972.65, $quoteCurrency)}</h1>
	
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
		<BlockTitle medium>Circle Balances: {formatValue(972.65, $quoteCurrency)}</BlockTitle>
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
					link="/apps/pollen/{id}"
				>
					<Icon slot="media" f7={['house', 'paw', 'house_alt', 'lasso'][Math.random() * 4 | 0]}>
						{#if proposals.length}
							<Badge color="yellow">{proposals.length}</Badge>
						{:else}
							<Badge color="green" icon="checkmark"><Icon f7="checkmark" size="0.9em" /></Badge>
						{/if}
					</Icon>

					<span slot="after">
						{formatValue(balance, $quoteCurrency)}
					</span>

					<svelte:fragment slot="footer">
						<p>{periodTimeRemaining} days to contribute</p>
						<p>
							<Progressbar progress={70} />
						</p>
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
