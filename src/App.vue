<template>
	<router-view v-if="hasQueryCompleted" />
	<div v-else id="loading">
		<div id="loading_box" class="z-depth-3">
			<img src="https://zabartcc.sfo3.digitaloceanspaces.com/images/zab_logo.png" alt="">
			<h3>Please Wait...</h3>
			<Spinner/>
		</div>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';

export default {
	async mounted () {
		await this.getUser();
	},
	components: {
		Spinner
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