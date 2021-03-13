<template>
	<div class="card">
		<div class="card-content">
			<div class="card-title">Completed Training Sessions</div>
		</div>
		<div v-if="sessions === null" class="loading_container">
			<Spinner />
		</div>
		<div v-else-if="sessions.length === 0" class="no_sessions">
			There have been no training sessions yet.
		</div>
		<div v-else>
		</div>
	</div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'CompletedSessions',
	data() {
		return {
			sessions: null
		};
	},
	components: {
		Spinner
	},
	async mounted() {

	},
	methods: {

	}
};
</script>

<style scoped lang="scss">
.no_sessions {
	font-style: italic;
	margin-top: -1em;
	padding: 1em;
}
</style>