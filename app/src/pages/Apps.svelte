<script>
	const dapps = [{
		image: require('../static/images/moola-thumbnail.png').default,
		name: ['moola', 'market'],
		description: 'earn interest on\ncUSD & cEUR',
		navigationLink: '/apps/moolamarket',
		theme: {
			gradientColors: ['#FFE760', '#01C126'],
			backgroundColor: 'hsl(135, 90%, 90%)',
			color: 'hsl(134, 50%, 48%)'
		}
	}, {
		image: require('../static/images/mento-thumbnail.png').default,
		name: ['celo', 'mento'],
		description: 'limit orders for\nthe Celo exchange',
		navigationLink: '/apps/mento',
		theme: {
			gradientColors: ['#68d9df', '#08d2bd'],
			backgroundColor: 'hsl(180, 90%, 90%)',
			color: 'hsl(180, 97%, 39%)'
		}
	}, {
		image: require('../static/images/centropay-thumbnail.png').default,
		name: ['centro', 'pay'],
		description: 'send and receive\nmoney on the go',
		navigationLink: '/apps/pay',
		theme: {
			gradientColors: ['#2636FF', '#5ADEEF'],
			backgroundColor: 'hsl(200, 90%, 90%)',
			color: 'hsl(200, 50%, 50%)'
		}
	}, {
		image: require('../static/images/ubeswap-thumbnail.png').default,
		name: ['ube', 'swap'],
		description: 'swap between\nERC-20 tokens',
		navigationLink: '/apps/ubeswap',
		theme: {
			gradientColors: ['#A3AEFF', '#5F47E6'],
			backgroundColor: 'hsl(249, 39%, 93%)',
			color: 'hsl(249, 90%, 70%)'
		}
	}, {
		image: require('../static/images/blockexplorer-thumbnail.png').default,
		name: ['block', 'explorer'],
		description: 'view transactions\nand balances',
		navigationLink: '/explorer',
		theme: {
			gradientColors: ['#7bd189', '#5d8162'],
			backgroundColor: 'hsl(0, 18%, 91%)',
			color: 'hsl(0, 0%, 44%)'
		}
	}, {
		image: require('../static/images/pollen-thumbnail.png').default,
		name: ['pollen', 'hives'],
		description: 'save and lend with\ntrusted peers',
		navigationLink: '/apps/pollen',
		theme: {
			gradientColors: ['#ffe000', '#e9b401'],
			backgroundColor: 'hsl(50, 96%, 90%)',
			color: 'hsl(52, 77%, 45%)'
		}
	}, {
		image: require('../static/images/carbonoffset-thumbnail.png').default,
		name: ['carbon', 'offset'],
		description: 'go carbon negative\nfor free!',
		navigationLink: '/apps/carbonoffset',
		theme: {
			gradientColors: ['#47ee9f', '#10c953'],
			backgroundColor: 'hsl(105, 96%, 90%)',
			color: 'hsl(105, 67%, 45%)'
		}
	}, {
		image: require('../static/images/impactmarket-thumbnail.png').default,
		name: ['impact', 'market'],
		description: 'donate directly to\nUBI beneficiaries',
		navigationLink: '/apps/impactmarket',
		theme: {
			gradientColors: ['#76d1f5', '#07ccbb'],
			backgroundColor: 'hsl(222, 96%, 93%)',
			color: 'hsl(222, 80%, 56%)'
		}
	}, /*{
		image: require('./static/images/poofcash-thumbnail.png').default,
		name: ['poof', 'cash'],
		description: 'private & anonymous\ntransactions',
		navigationLink: '/apps/poofcash'
	}*/]


	import { Block, Navbar, NavTitle, NavTitleLarge, Page } from 'framework7-svelte'
	import CurrentWallet from '../components/CurrentWallet.svelte'
	import HomeSlider from '../components/HomeSlider.svelte'
</script>


<Page name="apps">
	<Navbar large sliding={false}>
		<NavTitle sliding>Celo DeFi Apps</NavTitle>
		<NavTitleLarge>Celo DeFi Apps</NavTitleLarge>

		<svelte:fragment slot="right">
			<CurrentWallet />
		</svelte:fragment>
	</Navbar>

	<HomeSlider />

	<Block>
		<div class="apps">
			{#each dapps as {image, name, description, navigationLink, theme} (name.join(''))}
				<a
					class="app {name.join('')}"
					href={navigationLink}
					style="
						--app-color: {theme.color};
						--app-background-color: {theme.backgroundColor};
						--app-gradient-color-1: {theme.gradientColors[0]};
						--app-gradient-color-2: {theme.gradientColors[1]};
					">
					<img src={image} />
					<h3><strong>{name[0]}</strong><span>{name[1]}</span></h3>
					<span class="description">{description}</span>
				</a>
			{/each}
		</div>
	</Block>
</Page>


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
		/* aspect-ratio: 1; */
		height: 8rem;

		display: grid;
		place-content: center;
		place-items: center;

		/* color: var(--app-color);
		border: 2px solid var(--app-color);
		box-shadow: 0 0.1em 0.5em var(--app-color); */
		color: #fff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		box-shadow: 0 0.1em 0.5em rgba(200, 200, 200, 0.3);
		background-color: var(--app-background-color);
		background: linear-gradient(135deg, var(--app-gradient-color-1), var(--app-gradient-color-2));
	}
	.app:active {
		opacity: 0.8;
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