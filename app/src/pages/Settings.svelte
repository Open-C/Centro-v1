<script>
	let theme = 'auto' // 'auto' | 'light' | 'dark'
	let requirePIN


	import { Page, Navbar, NavTitle, NavTitleLarge, List, ListItem, Toggle, Segmented, Button, Icon } from 'framework7-svelte'
</script>

<Page name="settings">
	<Navbar large sliding={false}>
		<NavTitle sliding>Settings</NavTitle>
		<NavTitleLarge>Settings</NavTitleLarge>
	</Navbar>

	<List strong inset>
		<ListItem
			link="wallets"
			title="Manage Wallets"
		>
			<Icon slot="media" f7="creditcard_fill" />
		</ListItem>
	</List>

	<List strong inset>
		<ListItem
			title="Require PIN to Unlock"
		>
			<svelte:fragment slot="media">
				{#key requirePIN}
					<Icon f7={requirePIN ? 'lock_filled' : 'lock_slash_filled'} />
				{/key}
			</svelte:fragment>
			<Toggle bind:checked={requirePIN} />
		</ListItem>
	</List>

	<List strong inset>
		<ListItem
			title="Theme"
		>
			<svelte:fragment slot="media">
				{#key theme}
					<Icon f7={{'auto': 'circle_lefthalf_fill', 'light': 'sun_max', 'dark': 'moon'}[theme]} />
				{/key}
			</svelte:fragment>
			<Segmented strong>
				<Button small active={theme === 'auto'} onClick={() => theme = 'auto'}>Auto</Button>
				<Button small active={theme === 'light'} onClick={() => theme = 'light'}>Light</Button>
				<Button small active={theme === 'dark'} onClick={() => theme = 'dark'}>Dark</Button>
			</Segmented>
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