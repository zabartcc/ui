<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Completed Sessions</span>
		</div>
		<div class="loading_container" v-if="!pastSessions">
			<Spinner />
		</div>
		<p class="no_sessions" v-else-if="pastSessions && pastSessions.length === 0">You have not completed a training session yet.</p>
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
						<td>{{formatDateTime(session.startTime)}}z</td>
						<td>{{formatDateTime(session.endTime)}}z</td>
						<td>{{session.milestone.name}}</td>
						<td>{{session.instructor.fname}} {{session.instructor.lname}}</td>
						<td class="options">
							<router-link :to="`/dash/training/session/${session._id}`" data-position="top" data-tooltip="View Session Details" class="tooltipped modal-trigger">
								<i class="material-icons">search</i>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="pastSessions && sessionAmount !== 0">
			<Pagination :amount="feedbackAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

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
		Spinner
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
			const {data} = await zabApi.get(`/training/sessions/past`, {
				params: {
					page: this.page,
					limit: this.limit
				}
			});
			this.pastSessions = data.data.sessions;
			this.sessionAmount = data.data.count;
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
	padding: 0em 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

.session_wrapper {
	overflow: auto;
}
</style>