<template>
	<router-view v-if=hasQueryCompleted></router-view>
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

<style>

</style>