<template>
	<div class="card">
		<div class="card-content">
			<div class="card-title">Training Sessions {{ controller !== '' ? ` – ${controller}` : '' }}</div>
		</div>
		<div v-if="!sessions" class="loading_container">
			<Spinner />
		</div>
		<div v-else-if="sessions && !sessions.length" class="no_sessions">
			There are no completed training sessions
		</div>
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
					<tr v-for="session in sessions" :key="session._id">
						<td>{{ dtLong(session.startTime) }}</td>
						<td>{{ dtLong(session.endTime) }}</td>
						<td>{{ session.milestone.name }}</td>
						<td>{{ session.instructor ? `${session.instructor.fname} ${session.instructor.lname}` : session.instructorCid }}</td>
						<td class="options">
							<router-link :to="`/ins/training/session/${session._id}`" data-position="top" data-tooltip="View Details" class="tooltipped">
								<i class="material-icons">search</i>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="sessions && sessionAmount">
			<Pagination :amount="sessionAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import Pagination from '@/components/Pagination.vue';

export default {
	name: 'CompletedSessions',
	data() {
		return {
			sessions: null,
			sessionAmount: 0,
			page: 1,
			limit: 20,
			amountOfPages: 0,
			controller: ''
		};
	},
	components: {
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
			const { data } = await zabApi.get(`/training/sessions/${this.$route.params.cid}`, {
				params: {
					page: this.page,
					limit: this.limit
				}
			});

			this.sessions = data.data.sessions;
			this.sessionAmount = data.data.count;
			this.controller = data.data.controller.fname + ' ' + data.data.controller.lname;
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