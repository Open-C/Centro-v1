<script>
  /*
	export let walletStore


	import { useStore } from 'framework7-svelte'

	let status = useStore(walletStore, 'status', _ => status = _)

	// let provider = useStore(walletStore, 'provider', _ => provider = _)

	let walletProviderName = useStore(walletStore, 'walletProviderName', _ => walletProviderName = _)
	// let signer = useStore(walletStore, 'signer', _ => signer = _)

	let address = useStore(walletStore, 'address', _ => address = _)
	let phoneNumber = useStore(walletStore, 'phoneNumber', _ => phoneNumber = _)

	let error = useStore(walletStore, 'error', _ => error = _)


	const walletProviders = [{
		name: 'Valora',
		icon: require('../static/images/valora-logo.png').default
	}, {
		name: 'MetaMask',
		icon: require('../static/images/metamask-logo.svg').default
	}]

	$: walletProvider = walletProviders.find(({name}) => name === walletProviderName)
	*/

  console.log("Made it!");
  export let walletMachine;
  console.log("Made it past machine!");

  export let connect;
  console.log("Made it past connect!");

  export let wallet;
  console.log("Made it past wallet!");

  $: ({
    connected,
    connecting,
    error,
    provider,

    walletProviderName,
    signer,

    address,
    phoneNumber,

    error,
  } = wallet);

  console.log("Made it past destructuring");

  const walletProviders = [
    {
      name: "Valora",
      icon: require("../static/images/valora-logo.png").default,
    },
    {
      name: "MetaMask",
      icon: require("../static/images/metamask-logo.svg").default,
    },
  ];

  $: walletProvider = walletProviders.find(
    ({ name }) => name === walletProviderName
  );

  console.log("Made it past walletProvider!");

  import { Block, Button, Preloader, Row } from "framework7-svelte";
  import Address from "./Address.svelte";
</script>

<Block strong inset>
  {#if !connected && !connecting}
    <h3>No wallet connected.</h3>
    {#each walletProviders as { name, icon }}
      <Button large fill {icon} onClick={() => connect(name)}>
        <img src={icon} alt="{name} Icon" height={20} />
        Connect {name}
      </Button>
    {/each}
    <hr />
    <Button large fill>Create New Centro Wallet</Button>
    <Button large fill>Import Account Key</Button>
  {:else if connecting}
    <Row>
      <Preloader />
      <h3>Connecting to {walletProviderName}...</h3>
    </Row>
    <Row>
      <Button fill onClick={() => walletMachine.send("CANCEL")}>Cancel</Button>
    </Row>
  {:else if !!error}
    <h3>We had trouble connecting to your wallet.</h3>
    <p>{error}</p>
    <Row>
      <Button fill onClick={() => walletMachine.send("RETRY")}>Retry</Button>
      <Button fill onClick={() => walletMachine.send("CANCEL")}>Cancel</Button>
    </Row>
  {:else if connected}
    <Row>
      <img
        src={walletProvider.icon}
        alt="{walletProvider.name} Icon"
        width={30}
        height={30}
      />
      <h2>{walletProvider.name}</h2>
    </Row>
    <p><Address {address} /></p>
    {#if phoneNumber}
      <p>Phone: {phoneNumber}</p>
    {/if}
  {/if}
</Block>

<!-- <Block strong inset>
	{#if status === 'disconnected'}
		<h3>No wallet connected.</h3>
		{#each walletProviders as {name, icon}}
			<Button fill {icon} onClick={() => walletStore.dispatch('connect', name)}>
				<img src={icon} alt="{name} Icon" height={20} />
				Connect {name}
			</Button>
		{/each}
		<Button fill>Create New Centro Wallet</Button>
		<Button fill>Import Account Key</Button>
	{:else if status === 'connecting'}
		<Row>
			<Preloader />
			<h3>Connecting to {walletProvider.name}...</h3>
		</Row>
		<Row>
			<Button fill onClick={() => walletStore.dispatch('cancel')}>Cancel</Button>
		</Row>
	{:else if status === 'connectFailed'}
		<h3>We had trouble connecting to your wallet.</h3>
		<p>{error}</p>
		<Row>
			<Button fill onClick={() => walletStore.dispatch('retry')}>Retry</Button>
			<Button fill onClick={() => walletStore.dispatch('cancel')}>Cancel</Button>
		</Row>
	{:else if status === 'connected'}
		<Row>
			<img src={walletProvider.icon} alt="{walletProvider.name} Icon" width={30} height={30} />
			<h2>{walletProvider.name}</h2>
		</Row>
		<p><Address address={address} /></p>
		<p>Phone: {phoneNumber}</p>
	{/if}
</Block> -->
