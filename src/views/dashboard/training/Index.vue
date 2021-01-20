<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Upcoming Sessions</span></div>
				<div class="card-title col s4"><router-link to="/dash/training/new"><span class="btn new_event_button right">Request Training</span></router-link></div>
			</div>
		</div>
		<div class="loading_container" v-if="!upcomingSessions">
			<Spinner />
		</div>
		<p class="no_sessions" v-else-if="upcomingSessions && upcomingSessions.length === 0">You have no upcoming training sessions.</p>
		<div class="session_wrapper" v-else>
			<table class="session_list striped">
				<thead class="session_list_head">
					<tr>
						<th>Milestone</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Instructor</th>
					</tr>
				</thead>
				<tbody class="session_list_row" v-if="upcomingSessions">
					<tr v-for="session in upcomingSessions" :key="session._id">
						<td>{{session.milestone.code + ' - ' + session.milestone.name}}</td>
						<td>{{formatDate(session.startTime)}}z</td>
						<td>{{formatDate(session.endTime)}}z</td>
						<td>{{session.instructor ? (session.instructor.fname + ' ' + session.instructor.lname) : 'Unfulfilled'}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<PastSessions />
</template>

<script>
import {TrainingMixin} from '@/mixins/TrainingMixin.js';
import Spinner from '@/components/Spinner.vue';
import PastSessions from './Past.vue';

export default {
	data() {
		return {
			upcomingSessions: null
		};
	},
	components: {
		Spinner,
		PastSessions
	},
	mixins: [TrainingMixin],
	async mounted() {
		await this.getUpcomingSessions();
	},
	methods: {
		async getUpcomingSessions() {
			this.upcomingSessions = await this.getUpcomingSessionsMixin(this.$store.state.user.user.data._id); 
		},
		formatDate(date) {
			return new Date(date).toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
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

.session_wrapper {
	width: 100%;
	overflow: auto;
}
</style>