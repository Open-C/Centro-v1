<script>
	import { Plugins } from '@capacitor/core'
	const { Clipboard } = Plugins

	import QRCodeScanner from './QRCodeScanner.svelte'


	export let preposition = 'To'
	export let address


	let sheetComponent
	$: sheet = sheetComponent?.instance()

	let isFocused = false
	$: isFocused || sheetComponent?.contains?.(document.activeElement) ? sheet?.open() : sheet?.close()
	function onFocus(){
		isFocused = true
	}
	function onBlur(){
		isFocused = false
	}


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


	import { Button, Input, Row, Icon, Sheet, PageContent, Block } from 'framework7-svelte'
</script>


<div class="line">
	<h3>{preposition}</h3>
	<Input
		type="text"
		placeholder="Address or Phone Number"
		clearButton
		clear="always"
		bind:value={address}
		{onFocus}
		{onBlur}
	/>
</div>

<Sheet
	bind:this={sheetComponent}
	class="recipient-sheet"
	push
>
	<PageContent>
		<Block>
			{#if !isScanning}
				<div class="line">
					<Button small fill><Icon f7="person_2_square_stack" size="1.25em" /> Address Book</Button>
					<Button small fill onClick={scanQRCode}><Icon f7="qrcode" size="1.25em" /> QR Code</Button>
					<Button small fill onClick={paste}><Icon f7="doc_on_clipboard" size="1.25em" /> Paste</Button>
				</div>
			{:else}
				<Row>
					<QRCodeScanner {onDataScanned} />
					<Button small fill color="gray" onClick={cancelScanQRCode}>Cancel</Button>
				</Row>
			{/if}
		</Block>
	</PageContent>
</Sheet>