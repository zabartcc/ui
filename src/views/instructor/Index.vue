<template>
	<div class="card home_intro">
		<div class="card-content">
			<span class="card-title">Instructor Dashboard</span>
			<div v-if="!stats" class="loading_container">
				<Spinner />
			</div>
			<div v-else>
				<div class="row row_no_margin">
					<div class="col s12">
						<div class="card stats_card">
							<div class="card-content">
								<h6>Students Longest in Queue</h6>
								<p class="center">Students listed in bold have never had a session, so their last request is displayed instead.</p>
							</div>
							<div class="table_wrapper">
								<table class="striped compact">
									<thead>
										<tr>
											<th>Student</th>
											<th>Rating</th>
											<th>Last Session Date/Request</th>
											<th>Last Milestone/Request</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="member in stats.controllersWithoutTraining" :key="member.cid">
											<td><strong>{{ member.fname }} {{ member.lname }}</strong></td>
											<td>{{ member.ratingLong }}</td>
											<td>{{ stats.lastRequest[member.cid] ? dtStandard(stats.lastRequest[member.cid].lastRequest) : 'N/A' }}</td>
											<td>{{ stats.lastRequest[member.cid]?.milestone?.name ?? 'N/A' }}</td>
										</tr>
										<tr>
											<td colspan="4" style="background-color: #333;"></td>
										</tr>
										<tr v-for="session in stats.lastTraining" :key="session.cid">
											<td>{{ session.student.fname }} {{ session.student.lname }}</td>
											<td>{{ session.student.ratingLong }}</td>
											<td>{{ dtStandard(session.lastSession) }}</td>
											<td>{{ session.milestone?.name || "Unknown" }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	name: 'InsDash',
	title: 'Instructor Dashboard',
	data() {
		return {
			stats: null
		};
	},
	async mounted() {
		const { data: statsData } = await zabApi.get('/stats/ins');
		this.stats = statsData.data;
	}
};
</script>

<style scoped lang="scss">
.table_wrapper {
	overflow: auto;

	table {
		min-width: 100%;
	}
}

.stats_card {
	h6 {
		text-align: center;
		margin-top: 0;
		font-weight: 700;
	}
	h5 {
		margin-bottom: 0;
		text-align: center;

		span {
			display: inline-flex;
			align-items: center;

			i {
				margin-right: 5px;
			}
		}
	}
}
</style>