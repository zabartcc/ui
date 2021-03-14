<template>
	<div class="card">
		<div class="card-content">
			<div class="card-title">Completed Training Sessions</div>
		</div>
		<div v-if="sessions === null" class="loading_container">
			<Spinner />
		</div>
		<div v-else-if="sessions && sessions.length === 0" class="no_sessions">
			There have been no training sessions yet.
		</div>
		<div class="session_wrapper" v-else>
			<table class="session_list striped">
				<thead class="session_list_head">
					<tr>
						<th>Student</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Instructor</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="session_list_row">
					<tr v-for="session in sessions" :key="session._id">
						<td>{{session.student.fname}} {{session.student.lname}}</td>
						<td>{{formatDateTime(session.startTime)}}z</td>
						<td>{{formatDateTime(session.endTime)}}z</td>
						<td>{{session.instructor.fname}} {{session.instructor.lname}}</td>
						<td class="options">
							<router-link :to="`/ins/training/sessions/${session._id}`" data-position="top" data-tooltip="View Session Details" class="tooltipped modal-trigger">
								<i class="material-icons">search</i>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="sessions && sessionAmount !== 0">
			<Pagination :amount="sessionAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';
import Pagination from '@/components/Pagination.vue';

export default {
	name: 'CompletedSessions',
	data() {
		return {
			sessions: null,
			sessionAmount: 0,
			page: 1,
			limit: 20,
			amountOfPages: 0
		};
	},
	components: {
		Spinner,
		Pagination
	},
	async mounted() {
		await this.getSessions();
		this.amountOfPages = Math.ceil(this.sessionAmount / this.limit);
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getSessions() {
			const {data} = await zabApi.get('/training/sessions', {
				params: {
					page: this.page,
					limit: this.limit
				}
			});

			this.sessions = data.data.sessions;
			this.amountOfSessions = data.data.count;
		},
		formatDateTime(value) {
			const d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC', hour12: false});
		}
	}
};
</script>

<style scoped lang="scss">
.no_sessions {
	font-style: italic;
	margin-top: -1em;
	padding: 0 1em 1em 1em;
}

.session_wrapper {
	overflow: auto;
}
</style>