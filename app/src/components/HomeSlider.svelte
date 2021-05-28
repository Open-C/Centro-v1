<script>
	import { Button, Card, CardContent, CardHeader, Icon, Link, Row, Swiper, SwiperSlide } from 'framework7-svelte'
</script>


<div class="home-slider">
	<div class="card-backdrop custom-backdrop"></div>
	<Swiper
		pagination
		centeredSlides
		slidesPerView={1.2}
		spaceBetween={-12}
	>
	<!-- direction={'vertical'} -->
	<!-- spaceBetween={20} -->
		<SwiperSlide>
			<Card>
				<CardContent>
					<div class="line">
						<p>100 CELO</p>
						<p>222.22 cUSD</p>
						<p>360.98 cEUR</p>
						<Button fill round small>Deposit</Button>
					</div>
				</CardContent>
			</Card>
		</SwiperSlide>
		<SwiperSlide>
			<Card expandable data-backdrop-el=".custom-backdrop">
				<CardContent>
					<h3>Centro is <strong>carbon-negative!</strong></h3>
					<p>Learn how we do it <Icon f7="chevron_right" /></p>
					<div class="card-opened-fade-in">
						<p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
					</div>
				</CardContent>
			</Card>
		</SwiperSlide>
	</Swiper>
</div>


<style>
	.home-slider :global(.swiper-container) {
		height: 10em;
		height: max-content;

		overflow-y: visible;
		z-index: 30000; /* .card-backdrop { z-index: 299; } */
	}
	.home-slider :global(.swiper-wrapper) {
		align-items: center;
	}
	.home-slider :global(.swiper-slide) {
		display: grid;
		align-items: center;
	}

	.home-slider :global(.card-expandable) {
		height: 6.5rem;
	}
</style>