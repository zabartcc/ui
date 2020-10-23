<template>
	<router-view v-if=hasQueryCompleted></router-view>
	<div v-else id="loading">
		<div id="loading_box" class="z-depth-3">
			<img :src="require('@/assets/images/icons/zab_icon_new.png')" alt="">
			<h3>Please Wait...</h3>
			<div class="preloader-wrapper big active">
				<div class="spinner-layer spinner-blue-only">
					<div class="circle-clipper left">
						<div class="circle"></div>
					</div><div class="gap-patch">
						<div class="circle"></div>
					</div><div class="circle-clipper right">
						<div class="circle"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
	mounted () {
		this.getUser();
	},
	computed: {
		...mapGetters('user', [
			'hasQueryCompleted'
		])
	},
	methods: {
		...mapActions('user', [
			'getUser'
		])
	}
};
</script>

<style scoped lang="scss">
#loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

#loading_box {
	text-align: center;
	padding: 3em;

	img {
		height: 100px;
	}
}
</style>