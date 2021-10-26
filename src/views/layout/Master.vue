<template>
	<div id="container">
		<Header />
			<main>
				<div class="row main-content wrapper">
					<div class="main_content col s12 l8 push-l4">
						<router-view></router-view>
					</div>
					<div class="sidebar col s12 l4 pull-l8">
						<Sidebar />
					</div>
				</div>
			</main>
		<Footer />
	</div>
</template>

<script>
import Header from '../partial/Header.vue';
import Sidebar from '../partial/Sidebar.vue';
import Footer from '../partial/Footer.vue';

export default {
	components: {
		Header,
		Sidebar,
		Footer
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
		margin: 15px 0;
	}
}
</style>