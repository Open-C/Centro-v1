<script>
	import { onMount } from 'svelte'
	import { getDevice }  from 'framework7/lite-bundle'
	import { f7, f7ready, App, Panel, Views, View, Popup, Page, Navbar, Toolbar, NavRight, Link, Block, BlockTitle, LoginScreen, LoginScreenTitle, List, ListItem, ListInput, ListButton, BlockFooter } from 'framework7-svelte'

	import capacitorApp from './capacitor-app'
	import routes from './routes'

	const device = getDevice()
	// Framework7 Parameters
	let f7params = {
		name: 'Centro', // App name
		theme: 'ios', // 'auto', // Automatic theme detection


		id: 'app.centro', // App bundle ID
		// App store
		// store: store,
		// App routes
		routes: routes,
		// Register service worker
		serviceWorker: {
			path: '/service-worker.js',
		},
		// Input settings
		input: {
			scrollIntoViewOnFocus: device.capacitor,
			scrollIntoViewCentered: device.capacitor,
		},
		// Capacitor Statusbar settings
		statusbar: {
			iosOverlaysWebView: true,
			androidOverlaysWebView: false,
		},
	}


	// Login screen demo data
	let username = ''
	let password = ''

	function alertLoginData() {
		f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
			f7.loginScreen.close()
		})
	}
	onMount(() => {
		f7ready(() => {

			// Init capacitor APIs (see capacitor-app.js)
			if (f7.device.capacitor) {
				capacitorApp.init(f7)
			}
			// Call F7 APIs here
		})
	})
</script>

<App { ...f7params } themeDark>

	<!-- Left panel with cover effect-->
	<Panel left cover themeDark>
		<View>
			<Page>
				<Navbar title="Left Panel"/>
				<Block>Left panel content goes here</Block>
			</Page>
		</View>
	</Panel>


	<!-- Right panel with reveal effect-->
	<Panel right reveal themeDark>
		<View>
			<Page>
				<Navbar title="Right Panel"/>
				<Block>Right panel content goes here</Block>
			</Page>
		</View>
	</Panel>


	<!-- Views/Tabs container -->
	<Views tabs class="safe-areas">
		<!-- Tabbar for switching views-tabs -->
		<Toolbar tabbar labels bottom>
			<Link tabLink="#view-assets" iconIos="f7:money_dollar_circle" iconAurora="f7:money_dollar_circle" iconMd="f7:money_dollar_circle" text="Assets" />
			<Link tabLink="#view-apps" tabLinkActive iconIos="f7:house_fill" iconAurora="f7:house_fill" iconMd="material:home" text="Apps" />
			<Link tabLink="#view-settings" iconIos="f7:gear" iconAurora="f7:gear" iconMd="material:settings" text="Settings" />
		</Toolbar>

		<!-- Assets View -->
		<View id="view-assets" name="assets" tab url="/assets" />

		<!-- Your main view/tab, should have "view-main" class. It also has "tabActive" prop -->
		<View id="view-apps" main tab tabActive url="/apps" />

		<!-- Settings View -->
		<View id="view-settings" name="settings" tab url="/settings" />

	</Views>


	<!-- Popup -->
	<Popup id="my-popup">
		<View>
			<Page>
				<Navbar title="Popup">
					<NavRight>
						<Link popupClose>Close</Link>
					</NavRight>
				</Navbar>
				<Block>
					<p>Popup content goes here.</p>
				</Block>
			</Page>
		</View>
	</Popup>

	<LoginScreen id="my-login-screen">
		<View>
			<Page loginScreen>
				<LoginScreenTitle>Login</LoginScreenTitle>
				<List form>
					<ListInput
						type="text"
						name="username"
						placeholder="Your username"
						bind:value={username}
					/>
					<ListInput
						type="password"
						name="password"
						placeholder="Your password"
						bind:value={password}
					/>
				</List>
				<List>
					<ListButton title="Sign In" onClick={() => alertLoginData()} />
				</List>
				<BlockFooter>
					Some text about login information.<br />Click "Sign In" to close Login Screen
				</BlockFooter>
			</Page>
		</View>
	</LoginScreen>
</App>
