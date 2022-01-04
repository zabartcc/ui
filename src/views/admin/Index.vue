<template>
	<div class="card home_intro">
		<div class="card-content">
			<span class="card-title">Admin Dashboard</span>
			<div v-if="!stats" class="loading_container">
				<Spinner />
			</div>
			<div v-else>
				<div class="row">
					<div class="col m4 s12">
						<div class="card stats_card">
							<div class="card-content">
								<h6>Total Hours (This Month)</h6>
								<h5>
									{{sec2hms(stats.totalTime)}}
								</h5>
							</div>
						</div>
					</div>
					<div class="col m4 s12">
						<div class="card stats_card">
							<div class="card-content">
								<h6>Total Controllers</h6>
								<h5>
									<span class="tooltipped" data-tooltip="Home" data-position="top"><i class="material-icons">home</i> {{stats.counts?.home || 0}}</span> / 
									<span class="tooltipped" data-tooltip="Visiting" data-position="top"><i class="material-icons">work</i> {{stats.counts?.vis || 0}}</span>
								</h5>
							</div>
						</div>
					</div>
					<div class="col m4 s12">
						<div class="card stats_card">
							<div class="card-content">
								<h6>Total Sessions (This Month)</h6>
								<h5>
									{{stats.totalSessions}}
								</h5>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div class="card stats_card">
							<div class="card-content">
								<h6>Controller Hours</h6>
								<canvas ref="hours_chart"></canvas>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div class="card stats_card">
							<div class="card-content">
								<h6>Rating Distribution</h6>
								<canvas ref="distb_chart"></canvas>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div class="card stats_card">
							<div class="card-content">
								<h6>Feedback</h6>
								<canvas ref="feedback_chart"></canvas>
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
import { Chart, registerables } from 'chart.js';

export default {
	name: 'AdminDash',
	title: 'Admin Dashboard',
	data() {
		return {
			stats: null
		};
	},
	async mounted() {
		Chart.register(...registerables);
		const {data: statsData} = await zabApi.get('/stats/admin');
		this.stats = statsData.data;
		this.$nextTick(() => {
			M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
				margin: 0
			});
			new Chart(this.$refs.feedback_chart, {
				type: 'line',
				data: {
					labels: this.stats.feedback.map(f => `${f.month} ${f.year}`),
					datasets: [{
						label: "Feedback Submitted",
						data: this.stats.feedback.map(f => f.total),
						borderColor: '#ed5c30',
						tension: 0.3
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});
			new Chart(this.$refs.hours_chart, {
				type: 'line',
				data: {
					labels: this.stats.hours.map(f => `${f.month} ${f.year}`),
					datasets: [{
						label: "Total Hours",
						data: this.stats.hours.map(h => Math.round(h.total/60/60*100)/100),
						borderColor: '#ed5c30',
						tension: 0.3
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						}
					}
				}
			});
			new Chart(this.$refs.distb_chart, {
				type: 'bar',
				data: {
					labels: this.stats.counts.byRating.map(f => f.rating),
					datasets: [{
						label: "Number of Controllers",
						data: this.stats.counts.byRating.map(f => f.count),
						backgroundColor: '#ed5c30',
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						}
					}
				}
			});
		});
	},
	methods: {
		sec2hms(secs) {
			if(!secs) return null;
			const hours = Math.floor(secs / 3600);
			const minutes = `0${Math.round((secs / 60) % 60)}`.slice(-2);
			const seconds = `0${secs % 60}`.slice(-2);
			return `${hours}:${minutes}:${seconds}`;
		},
	}
};
</script>

<style scoped lang="scss">
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