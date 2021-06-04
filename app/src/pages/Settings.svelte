<script>
	import { theme, requirePIN, quoteCurrency } from '../data/settings'


	import { Page, Navbar, NavTitle, NavTitleLarge, List, ListItem, Toggle, Icon } from 'framework7-svelte'
	import SegmentedSelect from '../components/SegmentedSelect.svelte'
</script>

<Page name="settings">
	<Navbar large sliding={false}>
		<NavTitle sliding>Settings</NavTitle>
		<NavTitleLarge>Settings</NavTitleLarge>
	</Navbar>

	<List strong inset>
		<ListItem
			link="/settings/wallets"
			title="Manage Wallets"
		>
			<Icon slot="media" f7="creditcard_fill" />
		</ListItem>

		<ListItem
			title="Quote Currency"

			smartSelect
			smartSelectParams={{
				openIn: 'popup',
				searchbar: true,
				searchbarPlaceholder: 'Search Tokens',
				scrollToSelectedItem: true,

				closeOnSelect: true
			}}
		>
			<svelte:fragment slot="media">
				{#key $quoteCurrency}
					<Icon f7={{'USD': 'money_dollar_circle', 'EUR': 'money_euro_circle', 'JPY': 'money_yen_circle', 'INR': 'money_ruble_circle'}[$quoteCurrency] ?? 'asterisk_circle'} />
				{/key}
			</svelte:fragment>

			<select bind:value={$quoteCurrency}>
				{#each ['USD', 'EUR', 'JPY', 'ZMW', 'CELO'] as currency}
					<option value={currency}>{currency}</option>
				{/each}
			</select>
		</ListItem>
	</List>

	<List strong inset>
		<ListItem
			title="Require PIN to Unlock"
		>
			<svelte:fragment slot="media">
				{#key $requirePIN}
					<Icon f7={$requirePIN ? 'lock_filled' : 'lock_slash_filled'} />
				{/key}
			</svelte:fragment>
			<Toggle bind:checked={$requirePIN} />
		</ListItem>
	</List>

	<List strong inset>
		<ListItem
			title="Theme"
		>
			<svelte:fragment slot="media">
				{#key $theme}
					<Icon f7={{'auto': 'circle_lefthalf_fill', 'light': 'sun_max', 'dark': 'moon'}[$theme]} />
				{/key}
			</svelte:fragment>
			<SegmentedSelect small
				bind:value={$theme}
				options={{'auto': 'Auto', 'light': 'Light', 'dark': 'Dark'}}
			/>
		</ListItem>
	</List>

	<List strong inset>
		<ListItem
			title="Help/FAQ"
			link="faq"
		>
			<Icon slot="media" f7="question_circle" />
		</ListItem>
		<ListItem
			title="Contact Support"
			link="contact"
		>
			<Icon slot="media" f7="chat_bubble_2" />
		</ListItem>
	</List>

	<List strong inset>
		<ListItem
			title="Log Out"
			link="logout"
		>
			<Icon slot="media" f7="person_crop_circle_badge_xmark" />
		</ListItem>
	</List>
</Page>