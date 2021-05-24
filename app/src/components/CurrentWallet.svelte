<script>    
	import { walletMachines } from '../data/wallets'
	$: currentWalletMachine = walletMachines[0]

	$: ({
		address
	} = $currentWalletMachine.context)


	import { Chip, Icon } from 'framework7-svelte'
	import Address from './Address.svelte'
</script>

<a href="/settings/wallets">
	<Chip>
		<Icon slot="media" f7="person_crop_circle" />

		{#if $currentWalletMachine.matches('connected')}
			<Address {address} />
		{:else}
			Connect Wallet
		{/if}
	</Chip>
</a>