<script>
	export let depositToken
	export let maxDepositAmount
	export let withdrawToken
	export let maxWithdrawAmount


	let mode = 'None'


	import { tokenBalances } from '../data/tokenBalances'


	import { Row, Button, Col, Segmented, Block } from 'framework7-svelte'
	import TokenDeposit from './TokenDeposit.svelte'
	import TokenWithdraw from './TokenWithdraw.svelte'
</script>


<Segmented strong>
	<Button active={mode === 'Deposit'} onClick={() => mode = 'Deposit'}>Deposit</Button>
	<Button active={mode === 'Withdraw'} onClick={() => mode = 'Withdraw'}>Withdraw</Button>
</Segmented>

{#if mode === 'None'}
{:else if mode === 'Deposit'}
	<Block inset strong>
		<TokenDeposit
			token={depositToken}
			maxAmount={maxDepositAmount}
		/>
	</Block>
{:else if mode === 'Withdraw'}
	<Block inset strong>
		<TokenWithdraw
			token={withdrawToken}
			maxAmount={maxWithdrawAmount}
		/>
	</Block>
{/if}


<!-- <Block inset strong>
	<Segmented strong>
		<Button active={mode === 'Deposit'} onClick={() => mode = 'Deposit'}>Deposit</Button>
		<Button active={mode === 'Withdraw'} onClick={() => mode = 'Withdraw'}>Withdraw</Button>
	</Segmented>
</Block>

<div class="stack">
	{#if mode === 'None'}
	{:else if mode === 'Deposit'}
		<Block inset strong>
			<TokenDeposit
				token={depositToken}
				maxAmount={maxDepositAmount}
			/>
		</Block>
	{:else if mode === 'Withdraw'}
		<Block inset strong>
			<TokenWithdraw
				token={withdrawToken}
				maxAmount={maxWithdrawAmount}
			/>
		</Block>
	{/if}
</div> -->


<!-- <div class="stack">
	{#if mode === 'None'}
		<Row>
			<Col>
				<Button fill onClick={() => mode = 'Deposit'}>Deposit</Button>
			</Col>
			<Col>
				<Button fill onClick={() => mode = 'Withdraw'}>Withdraw</Button>
			</Col>
		</Row>
	{:else if mode === 'Deposit'}
		<Block inset strong>
			<TokenDeposit
				token={depositToken}
				maxAmount={maxDepositAmount}
			/>
		</Block>
	{:else if mode === 'Withdraw'}
		<Block inset strong>
			<TokenWithdraw
				token={withdrawToken}
				maxAmount={maxWithdrawAmount}
			/>
		</Block>
	{/if}
</div> -->