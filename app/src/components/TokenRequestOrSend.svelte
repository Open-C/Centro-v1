<script>
	export let token


	let mode = 'None'


	import { tokenBalances } from '../data/tokenBalances'


	import { Block, Row, Button, Col, Segmented, Toolbar, Link, Tab, Tabs, Page, Swiper, SwiperSlide } from 'framework7-svelte'
	import TokenRequest from './TokenRequest.svelte'
	import TokenSend from './TokenSend.svelte'

	import { scale } from 'svelte/transition'
</script>

<!-- <Swiper
    spaceBetween={50}
    on:slideChange={() => console.log('slide change')}
    on:swiper={(e) => console.log(e.detail[0])}
>
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
</Swiper> -->

<!-- <Page pageContent={false}>
	<Toolbar tabbar>
		<Link tabLink="#tab-1">Tab 1</Link>
		<Link tabLink="#tab-2">Tab 2</Link>
		<Link tabLink="#tab-3">Tab 3</Link>
	</Toolbar>
	<Tabs swipeable>
		<Tab id="tab-1">
			<Block>
				<p>Tab 1 content</p>
			</Block>
		</Tab>
		<Tab id="tab-2">
			<Block>
				<p>Tab 2 content</p>
			</Block>
		</Tab>
		<Tab id="tab-3">
			<Block>
				<p>Tab 2 content</p>
			</Block>
		</Tab>
	</Tabs>
</Page> -->

<Segmented strong>
	<Button active={mode === 'Request'} onClick={() => mode = 'Request'}>Request</Button>
	<Button active={mode === 'Send'} onClick={() => mode = 'Send'}>Send</Button>
</Segmented>
{#if mode === 'Request'}
	<Block inset strong>
		<TokenRequest {token} />
	</Block>
{:else if mode === 'Send'}
	<Block inset strong>
		<TokenSend
			token={token}
			maxAmount={tokenBalances[token.symbol].amount}
		/>
	</Block>
{/if}


<!-- <Block inset strong>
	<Segmented>
		<Button active={mode === 'Request'} onClick={() => mode = 'Request'}>Request</Button>
		<Button active={mode === 'Send'} onClick={() => mode = 'Send'}>Send</Button>
	</Segmented>

	{#if mode === 'Request'}
		<TokenRequest {token} />
	{:else if mode === 'Send'}
		<TokenSend
			token={token}
			maxAmount={tokenBalances[token.symbol].amount}
		/>
	{/if}
</Block> -->


<!--
<Block inset strong class="stack">
	{#if mode === 'None'}
		<Segmented strong>
			<Button active={mode === 'Request'} onClick={() => mode = 'Request'}>Request</Button>
			<Button active={mode === 'Send'} onClick={() => mode = 'Send'}>Send</Button>
		</Segmented>
	{:else if mode === 'Request'}
		<div transition:scale>
			<TokenRequest {token} />
		</div>
	{:else if mode === 'Send'}
		<div transition:scale>
			<TokenSend
				token={token}
				maxAmount={tokenBalances[token.symbol].amount}
			/>
		</div>
	{/if}
</Block> -->

<!-- <Segmented strong>
	<Button active={mode === 'Request'} onClick={() => mode = 'Request'}>Request</Button>
	<Button active={mode === 'Send'} onClick={() => mode = 'Send'}>Send</Button>
</Segmented>

<Block inset strong class="stack">
	{#if mode === 'None'}
	{:else if mode === 'Request'}
		<div transition:scale>
			<TokenRequest {token} />
		</div>
	{:else if mode === 'Send'}
		<div transition:scale>
			<TokenSend
				token={token}
				maxAmount={tokenBalances[token.symbol].amount}
			/>
		</div>
	{/if}
</Block> -->