<script>    
	import { walletMachines } from '../data/wallets'
	$: currentWalletMachine = walletMachines[0]

	$: ({
		address,
		subAccount = 'Account 1'
	} = $currentWalletMachine.context)


	import { Chip, Icon, Link } from 'framework7-svelte'
	import Address from './Address.svelte'
</script>

<Link panelOpen="#wallets">
	<Chip>
		<Icon slot="media" f7="person_crop_circle" />

		{#if $currentWalletMachine.matches('connected')}
			<Address {address} truncated />
			›
			<strong>{subAccount}</strong>
		{:else}
			Connect Wallet
		{/if}
	</Chip>
</Link>