<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Past Sessions</span>
		</div>
		<div class="loading_container" v-if="!pastSessions">
			<Spinner />
		</div>
		<p class="no_sessions" v-else-if="pastSessions && pastSessions.length === 0">You have not completed a training session yet.</p>
		<div class="session_wrapper" v-else>
		</div>
	</div>
</template>

<script>
import {TrainingMixin} from '@/mixins/TrainingMixin.js';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'PastSessions',
	data() {
		return {
			pastSessions: null
		};
	},
	components: {
		Spinner
	},
	mixins: [TrainingMixin],
	async mounted() {
		await this.getPastSessions();
	},
	methods: {
		async getPastSessions() {
			this.pastSessions = await this.getPastSessionsMixin(this.$store.state.user.user.data._id);
		}
	}

};
</script>

<style scoped lang="scss">
.no_sessions {
	padding: 1em;
	margin-top: -10px;
	font-style: italic;
}
</style>