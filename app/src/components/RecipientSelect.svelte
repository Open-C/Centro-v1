<script>
	import { Plugins } from '@capacitor/core'
	const { Clipboard } = Plugins

	import QRCodeScanner from './QRCodeScanner.svelte'


	export let preposition = 'To'
	export let address


	let isScanning = false
	
	function scanQRCode(){
		isScanning = true
	}
	function cancelScanQRCode(){
		isScanning = false
	}
	
	async function paste(){
		address = (await Clipboard.read()).value
	}
	
	function onDataScanned(data){
		address = data
		isScanning = false
	}


	import { Button, Input, Row } from 'framework7-svelte'
</script>

<div class="line">
	<h3>{preposition}</h3>
	<Input
		type="tel"
		placeholder="Address or Phone Number"
		clearButton
		clear="always"
		bind:value={address}
	/>
</div>
{#if !isScanning}
	<Row>
		<Button small fill color="gray" onClick={scanQRCode}>Scan QR Code</Button>
		<Button small fill color="gray" onClick={paste}>Paste</Button>
	</Row>
{:else}
	<Row>
		<QRCodeScanner {onDataScanned} />
		<Button small fill color="gray" onClick={cancelScanQRCode}>Cancel</Button>
	</Row>
{/if}