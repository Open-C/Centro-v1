<script>
  import { onMount } from "svelte";
  import { getDevice } from "framework7/lite-bundle";
  import { f7, f7ready } from "framework7-svelte";

  import capacitorApp from "./capacitor-app";
  import routes from "./routes";

  const device = getDevice();
  // Framework7 Parameters
  let f7params = {
    name: "Centro", // App name
    theme: "ios", // 'auto', // Automatic theme detection

    id: "app.centro", // App bundle ID
    // App store
    // store: store,
    // App routes
    routes: routes,
    // Register service worker
    serviceWorker: {
      path: "/service-worker.js",
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

    view: {
      // browserHistory: true,
      browserHistorySeparator: "#",
      masterDetailBreakpoint: 680,
      masterDetailResizable: true,
      // allowDuplicateUrls: true
    },

    popup: {
      closeOnEscape: true,
    },
    sheet: {
      closeOnEscape: true,
    },
    popover: {
      closeOnEscape: true,
    },
    actions: {
      closeOnEscape: true,
    },
  };

  import { theme, requirePIN } from "./data/settings";
  import { preferredColorScheme } from "./data/preferredColorScheme";

  // Login screen demo data
  let username = "";
  let password = "";

  function alertLoginData() {
    f7.dialog.alert(
      "Username: " + username + "<br>Password: " + password,
      () => {
        f7.loginScreen.close();
      }
    );
  }

  onMount(() => {
    f7ready(() => {
      // Init capacitor APIs (see capacitor-app.js)
      if (f7.device.capacitor) {
        capacitorApp.init(f7);
      }
      // Call F7 APIs here
    });
  });

  import {
    App,
    Appbar,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter,
    Button,
  } from "framework7-svelte";
  import Wallets from "./pages/settings/Wallets.svelte";
  import CurrentWallet from "./components/CurrentWallet.svelte";
  import { Provider } from "svelte-redux-connect";
  import { store } from "./redux";
</script>

<Provider {store}>
  <App
    {...f7params}
    themeDark={($theme === "auto" ? $preferredColorScheme : $theme) ===
      "dark" || undefined}
  >
    <Panel
      id="wallets"
      right
      effect="cover"
      swipe
      swipeOnlyClose
      swipeThreshold={100}
    >
      <View>
        <Wallets isPage={false} />
      </View>
    </Panel>

    <!-- Views/Tabs container -->
    <Views tabs class="safe-areas">
      <Appbar noHairline>
        <div class="left" />
        <div class="right">
          <CurrentWallet />
        </div>
      </Appbar>

      <!-- Tabbar for switching views-tabs -->
      <Toolbar tabbar labels bottom>
        <Link
          tabLink="#view-assets"
          iconIos="f7:money_dollar_circle"
          iconAurora="f7:money_dollar_circle"
          iconMd="f7:money_dollar_circle"
          text="Assets"
        />
        <Link
          tabLink="#view-apps"
          tabLinkActive
          iconIos="f7:house"
          iconAurora="f7:house"
          iconMd="material:home"
          text="Apps"
        />
        <Link
          tabLink="#view-settings"
          iconIos="f7:gear_alt"
          iconAurora="f7:gear_alt"
          iconMd="material:settings"
          text="Settings"
        />
      </Toolbar>

      <!-- Assets View -->
      <View id="view-assets" name="assets" tab url="/assets" />

      <!-- Your main view/tab, should have "view-main" class. It also has "tabActive" prop -->
      <View
        id="view-apps"
        main
        tab
        tabActive
        url="/apps"
      /><!-- browserHistory -->

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
            Some text about login information.<br />Click "Sign In" to close
            Login Screen
          </BlockFooter>
        </Page>
      </View>
    </LoginScreen>
  </App>
</Provider>

<style>
  :global(.appbar .chip) {
    align-self: flex-start;
    margin-top: 0.5em;
  }
</style>
