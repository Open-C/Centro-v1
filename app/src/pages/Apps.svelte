<script>
	const dapps = [{
		image: require('../static/images/moola-thumbnail.png').default,
		name: ['moola', 'market'],
		description: 'earn interest on\ncUSD & cEUR',
		navigationLink: '/apps/moolamarket',
		theme: {
			backgroundColor: 'hsl(135, 90%, 90%)',
			color: 'hsl(134, 50%, 48%)'
		}
	}, {
		image: require('../static/images/mento-thumbnail.png').default,
		name: ['celo', 'mento'],
		description: 'limit orders for\nthe Celo exchange',
		navigationLink: '/apps/mento',
		theme: {
			backgroundColor: 'hsl(180, 90%, 90%)',
			color: 'hsl(180, 97%, 39%)'
		}
	}, {
		image: require('../static/images/centropay-thumbnail.png').default,
		name: ['centro', 'pay'],
		description: 'send and receive\nmoney on the go',
		navigationLink: '/apps/pay',
		theme: {
			backgroundColor: 'hsl(200, 90%, 90%)',
			color: 'hsl(200, 50%, 50%)'
		}
	}, {
		image: require('../static/images/ubeswap-thumbnail.png').default,
		name: ['ube', 'swap'],
		description: 'swap between\nERC-20 tokens',
		navigationLink: '/apps/ubeswap',
		theme: {
			backgroundColor: 'hsl(249, 39%, 93%)',
			color: 'hsl(249, 90%, 70%)'
		}
	}, {
		image: require('../static/images/blockexplorer-thumbnail.png').default,
		name: ['block', 'explorer'],
		description: 'view transactions\nand balances',
		navigationLink: '/explorer',
		theme: {
			backgroundColor: 'hsl(0, 18%, 91%)',
			color: 'hsl(0, 0%, 44%)'
		}
	}, {
		image: require('../static/images/pollen-thumbnail.png').default,
		name: ['pollen', 'hives'],
		description: 'save and lend with\ntrusted peers',
		navigationLink: '/apps/pollen',
		theme: {
			backgroundColor: 'hsl(50, 96%, 90%)',
			color: 'hsl(52, 77%, 45%)'
		}
	}, {
		image: require('../static/images/carbonoffset-thumbnail.png').default,
		name: ['carbon', 'offset'],
		description: 'go carbon negative\nfor free!',
		navigationLink: '/apps/carbonoffset',
		theme: {
			backgroundColor: 'hsl(105, 96%, 90%)',
			color: 'hsl(105, 67%, 45%)'
		}
	}, {
		image: require('../static/images/impactmarket-thumbnail.png').default,
		name: ['impact', 'market'],
		description: 'donate directly to\nUBI beneficiaries',
		navigationLink: '/apps/impactmarket',
		theme: {
			backgroundColor: 'hsl(222, 96%, 93%)',
			color: 'hsl(222, 80%, 56%)'
		}
	}, /*{
		image: require('./',
		name: ['poof').default, 'cash'],
		description: 'private & anonymous\ntransactions',
		navigationLink: '/apps/poofcash'
	}*/]

	import { Block, Card, CardHeader, ListItem, Navbar, NavTitle, NavTitleLarge, Page } from 'framework7-svelte'
	import CurrentWallet from '../components/CurrentWallet.svelte'
</script>

<style>
	.apps {
		display: grid;
		/* grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr)); */
		grid-template-columns: repeat(auto-fit, 8rem);
		justify-content: center;
		text-align: center;
		gap: var(--f7-grid-gap);
	}

	.app {
		border-radius: 1em;
		padding: 0 1em;
		max-width: 100%;
		box-shadow: 0 0.1em 0.5em;
		aspect-ratio: 1;
		display: grid;
		place-content: center;
		place-items: center;
		border: 2px solid;
	}

	h3 {
		font-weight: normal;
		font-size: 1.15em;
	}

	img {
		width: 6em;
		height: 3.5em;
		object-fit: contain;
		margin-bottom: 0.5em;
	}

	.description {
		font-size: 0.7em;
		line-height: 1.1;
		opacity: 0.8;
	}
</style>

<Page name="apps">
	<Navbar large sliding={false}>
		<CurrentWallet slot="right" />
		<NavTitle sliding>Celo DeFi Apps</NavTitle>
		<NavTitleLarge>Celo DeFi Apps</NavTitleLarge>
	</Navbar>

	<Block>
		<div class="apps">
			{#each dapps as {image, name, description, navigationLink, theme} (name.join(''))}
				<a class="app {name.join('')}" href={navigationLink} style="color: {theme.color}; background-color: {theme.backgroundColor}">
					<img src={image} />
					<h3><strong>{name[0]}</strong><span>{name[1]}</span></h3>
					<span class="description">{description}</span>
				</a>
			{/each}
		</div>
	</Block>
</Page>