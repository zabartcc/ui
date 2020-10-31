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
import Header from '../partial/Header';
import Footer from '../partial/Footer';
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

// .admin_content {
// 	height: 100%;
// 	padding: 1em 1em 1em calc(350px + 1em);
// 	box-sizing: border-box;
// }
</style>