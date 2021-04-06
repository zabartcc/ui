<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">404 - Not Found</span>
			<p>
				Daan made an uh-oh.
			</p>
			<p>
				We're sorry, but unfortunately we could not find the content that you requested. If you believe that you are receiving this message in error, please email the webmaster. In the meantime, a cute pupper has been dispatched to ease your sorrows.
			</p>
			<p>
				<img :src="require('@/assets/images/dog.jpg')" alt="">
			</p>
		</div>
	</div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.card-content {
	p + p {
		margin-top: 1.5em;
	}
}
img {
	max-width: 100%;
}
</style>