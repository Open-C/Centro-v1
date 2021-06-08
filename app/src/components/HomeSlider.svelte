<script>
	import { sortTokensByBalance } from '../utils/sortTokensByBalance'
	import { tokens } from '../data/tokens'
	import { tokenBalances } from '../data/tokenBalances'
	import { tokenPricesUSD } from '../data/tokenPrices'


	import { Block, Button, Card, CardContent, CardHeader, Icon, Link, Row, Swiper, SwiperSlide } from 'framework7-svelte'
</script>


<div class="home-slider">
	<!-- <div class="card-backdrop custom-backdrop"></div> -->

	<Swiper
		pagination
		centeredSlides
		slidesPerView={1.2}
		spaceBetween={16}
	>
	<!-- direction={'vertical'} -->
	<!-- spaceBetween={20} -->
		<SwiperSlide>
			<Block strong>
				<div class="line">
					{#each sortTokensByBalance(tokens, tokenBalances, tokenPricesUSD).slice(0, 3) as token}
						<div class="balance" style="--f7-theme-color: {token.color}">
							<strong class="amount"><mark>{tokenBalances[token.symbol]?.amount}</mark></strong>
							<span class="symbol">{token.symbol}</span>
						</div>
					{/each}
					<Button fill small>Deposit</Button>
				</div>
			</Block>
		</SwiperSlide>
		<SwiperSlide>
			<Block strong style="--background-image: url({require('../static/images/sustainable-thumbnail.png').default})">
				<h3>Centro is <strong>carbon-negative!</strong></h3>
				<p>Learn how we do it <Icon f7="chevron_right" size="1em" /></p>
				<!-- <img class="background-image" src={require('../static/images/sustainable-thumbnail.png').default} height="70" /> -->
				<!-- <div class="card-opened-fade-in">
					<p>More information about Celo's environmental initiatives.</p>
				</div> -->
			</Block>
			<!-- <Card expandable data-backdrop-el=".custom-backdrop">
				<CardContent>
					<h3>Centro is <strong>carbon-negative!</strong></h3>
					<p>Learn how we do it <Icon f7="chevron_right" size="1em" /></p>
					<img class="background-image" src={require('../static/images/sustainable-thumbnail.png').default} height="70" />
					<!-- <div class="card-opened-fade-in">
						<p>More information about Celo's environmental initiatives.</p>
					</div> -- >
				</CardContent>
			</Card -->
		</SwiperSlide>
	</Swiper>
</div>


<style>
	.home-slider {
		--f7-card-bg-color: linear-gradient(125deg, #4753ffbb, #717afcbb);
	}


	.home-slider :global(.swiper-container) {
		height: 10em;
		height: max-content;

		overflow-y: visible;
		z-index: 30000; /* .card-backdrop { z-index: 299; } */
	}
	/* .home-slider :global(.swiper-wrapper) {
		align-items: stretch;
	}
	.home-slider :global(.swiper-slide) {
		display: grid;
		align-items: center;
		height: 6rem;
	} */
	.home-slider :global(.swiper-slide .block) {
		display: grid;
		align-items: center;
		height: 5.5rem;
	}
	/*.background-image {*/
		.home-slider :global(.swiper-slide .block:after) {
		content: '';
		background: var(--background-image);
		position: absolute;
		/* top: 0.5em;
		bottom: 0.5em;
		right: 0.5em; */
		inset: 0;
	}
	.home-slider :global(.swiper-container) {
		padding-bottom: 2rem;
	}
	.home-slider :global(.swiper-pagination) {
		bottom: 0.5rem;
	}

	.home-slider :global(.card-expandable) {
		height: 6.5rem;
	}


	.balance .amount {
		font-size: 1.3em;
	}
	.balance .symbol {
		opacity: 0.5;
	}
</style>