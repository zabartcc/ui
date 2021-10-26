<template>
	<div id="container">
		<Header />
			<main>
				<div class="row wrapper">
					<div class="sidebar col s12 l3">
						<AdminSidebar />
					</div>
					<div class="col s12 l9">
						<router-view></router-view>
					</div>
				</div>
			</main>
		<Footer />
	</div>
</template>

<script>
import Header from '../partial/Header.vue';
import Footer from '../partial/Footer.vue';
import AdminSidebar from '../admin/AdminSidebar.vue';

export default {
	components: {
		Header,
		Footer,
		AdminSidebar
	}, 
};
</script>

<style scoped lang="scss">
#container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	main {
		flex: 1 0 auto;
		margin: 1em 0;
	}
}
</style>