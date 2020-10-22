<template>
	<div id="container">
		<Header />
			<main>
				<div class="row main-content wrapper">
					<div class="sidebar col s12 l4">
						<Sidebar />
					</div>
					<div class="main_content col s12 l8">
						<router-view></router-view>
					</div>
				</div>
			</main>
		<!-- <Footer /> -->
	</div>
</template>

<script>
import Header from '../partial/Header';
import Sidebar from '../partial/Sidebar';

export default {
	components: {
		Header,
		Sidebar,
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