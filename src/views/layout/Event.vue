<template>
	<div id="container">
		<Header />
			<main>
				<div class="row main-content wrapper">
					<div class="main_content col s12 l8 push-l4">
						<router-view></router-view>
					</div>
					<div class="sidebar col s12 l4 pull-l8">
						<EventAssignment />
						<Sidebar />
					</div>
				</div>
			</main>
		<Footer />
	</div>
</template>

<script>
import Header from '../partial/Header.vue';
import Footer from '../partial/Footer.vue';
import Sidebar from '../partial/Sidebar.vue';
import EventAssignment from '../partial/EventAssignment.vue';

export default {
	components: {
		Header,
		Footer,
		Sidebar,
		EventAssignment
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