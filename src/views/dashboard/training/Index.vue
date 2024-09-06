<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Training Requests</span></div>
				<div class="col s4"><a href="https://training.zabartcc.net/"><span class="btn new_event_button right">Request</span></a></div>
			</div>
		</div>
		<div class="loading_container" v-if="!upcomingSessions">
			<Spinner />
		</div>
		<p class="no_sessions" v-else-if="upcomingSessions && !upcomingSessions.length">You have no upcoming training sessions.</p>
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
						<td>{{ session.milestone.code + ' - ' + session.milestone.name }}</td>
						<td>{{ dtLong(session.startTime) }}</td>
						<td>{{ dtLong(session.endTime) }}</td>
						<td>{{ session.instructor ? (session.instructor.fname + ' ' + session.instructor.lname) : 'Unfulfilled' }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<PastSessions />
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import PastSessions from './Past.vue';

export default {
	name: 'TrainingDash',
	title: 'Training',
	data() {
		return {
			upcomingSessions: null
		};
	},
	components: {
		PastSessions
	},
	async mounted() {
		await this.getUpcomingSessions();
	},
	methods: {
		async getUpcomingSessions() {
			const { data } = await zabApi.get(`/training/request/upcoming`);
			this.upcomingSessions = data.data;
		}
	}

};
</script>

<style scoped lang="scss">
.no_sessions {
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

table {
	min-width: 500px;
}

.session_wrapper {
	overflow: auto;
}

.session_list {
	min-width: 500px;
}

.session_list_row {
	tr {
		transition: background-color .3s ease;
		&:hover {
			background: #eaeaea;
		}
	}
}
</style>