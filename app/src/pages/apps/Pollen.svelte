<script>
	const circles = [
		{
			id: 1,
			name: 'Mwabila Farm',
			governanceModel: 'Democratic', // 'Weighted Democratic' | 'Administrator' | 'Multi-Administrator'
			depositMinimum: 0,
			period: 7, // days
			latePenalty: 0,

			balance: 831,
			periodTimeRemaining: 4,
			members: [
				{
					name: 'David',
					address: '',
					balance: 49
				},
				{
					name: 'Marek',
					address: '',
					balance: 56
				},
				{
					name: 'Eric',
					address: '',
					balance: -43
				},
				{
					name: 'Rene',
					address: '',
					balance: 37
				}
			],
			proposals: [
				{
					type: 'Loan',
					amount: 70,
					member: {},
					description: 'seeds & fertilizer'
				}
			],
			debts: [
				{
					type: 'Loan',
					amount: 130,
					member: {},
					description: 'irrigation pump'
				},
				{
					type: 'Loan',
					amount: 70,
					member: {},
					description: 'seeds & fertilizer'
				}
			]
		},
		{
			id: 2,
			name: 'Alta Farm',
			governanceModel: 'Weighted Democratic', // 'Weighted Democratic' | 'Administrator' | 'Multi-Administrator'
			depositMinimum: 0,
			period: 14, // days
			latePenalty: 0,

			balance: 8172,
			periodTimeRemaining: 7,
			members: [
				{
					name: 'David',
					address: '',
					balance: 49
				},
				{
					name: 'Marek',
					address: '',
					balance: 56
				},
				{
					name: 'Eric',
					address: '',
					balance: -43
				},
				{
					name: 'Rene',
					address: '',
					balance: 37
				}
			],
			proposals: [
				{
					type: 'Loan',
					amount: 70,
					member: {},
					description: 'seeds & fertilizer'
				}
			],
			debts: [
				{
					type: 'Loan',
					amount: 130,
					member: {},
					description: 'irrigation pump'
				},
				{
					type: 'Loan',
					amount: 70,
					member: {},
					description: 'seeds & fertilizer'
				}
			]
		},
		{
			id: 3,
			name: 'The Grove',
			governanceModel: 'Administrator', // 'Weighted Democratic' | 'Administrator' | 'Multi-Administrator'
			depositMinimum: 0,
			period: 21, // days
			latePenalty: 0,

			balance: 4529,
			periodTimeRemaining: 2,
			members: [
				{
					name: 'David',
					address: '',
					balance: 49
				},
				{
					name: 'Marek',
					address: '',
					balance: 56
				},
				{
					name: 'Eric',
					address: '',
					balance: -43
				},
				{
					name: 'Rene',
					address: '',
					balance: 37
				}
			],
			proposals: [
				{
					type: 'Loan',
					amount: 70,
					member: {},
					description: 'seeds & fertilizer'
				}
			],
			debts: [
				{
					type: 'Loan',
					amount: 130,
					member: {},
					description: 'irrigation pump'
				},
				{
					type: 'Loan',
					amount: 70,
					member: {},
					description: 'seeds & fertilizer'
				}
			]
		}
	]


	let mode


	import { Page, Navbar, Block, Progressbar, ListItem, BlockTitle, List, Segmented, Button, Icon } from 'framework7-svelte'
</script>

<Page>
	<Navbar title="Pollen" backLink="Apps">
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

	{#if circles.length}
		<BlockTitle>Circle Balances: {972.65}</BlockTitle>
		<List inset
			sortable
			sortableTapHold
			mediaList
		>
			{#each circles as {
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
					<svelte:fragment slot="footer">
						<p>{periodTimeRemaining} days to contribute</p>
						<Progressbar progress={70} />
					</svelte:fragment>
				</ListItem>
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
