<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Completed Sessions</span>
		</div>
		<div class="loading_container" v-if="!pastSessions">
			<Spinner />
		</div>
		<p class="no_sessions" v-else-if="pastSessions && !pastSessions.length">You have not completed any training sessions yet</p>
		<div class="session_wrapper" v-else>
			<table class="session_list striped">
				<thead class="session_list_head">
					<tr>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Milestone</th>
						<th>Instructor</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="session_list_row">
					<tr v-for="session in pastSessions" :key="session._id">
						<td>{{ dtLong(session.startTime) }}</td>
						<td>{{ dtLong(session.endTime) }}</td>
						<td>{{ (session.milestone) ? session.milestone.name : 'Unknown' }}</td>
						<td>{{ session.instructor ? session.instructor.fname + ' ' + session.instructor.lname : session.instructorCid }}</td>
						<td class="options">
							<router-link :to="`/dash/training/session/${session._id}`" data-position="top" data-tooltip="View Session Details" class="tooltipped">
								<i class="material-icons">search</i>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="pastSessions && sessionAmount">
			<Pagination :amount="sessionAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import Pagination from '@/components/Pagination.vue';

export default {
	name: 'PastSessions',
	data() {
		return {
			pastSessions: null,
			sessionAmount: 0,
			page: 1,
			limit: 20,
			amountOfPages: 0
		};
	},
	components: {
		Pagination
	},
	async mounted() {
		await this.getPastSessions();
		this.amountOfPages = Math.ceil(this.sessionAmount / this.limit);
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getPastSessions() {
			const { data } = await zabApi.get(`/training/sessions/past`, {
				params: {
					page: this.page,
					limit: this.limit
				}
			});
			this.pastSessions = data.data.sessions;
			this.sessionAmount = data.data.count;
		},
	}

};
</script>

<style scoped lang="scss">
.no_sessions {
	padding: 0em 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

table {
	min-width: 100%;
}

.session_wrapper {
	overflow: auto;
}

.session_list {
	min-width: 600px;
}
</style>