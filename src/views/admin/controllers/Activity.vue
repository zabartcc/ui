<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Controller Activity Report</span>
			<p>Showing controller activity since {{dLong(chkDate)}}</p>
		</div>
		<table class="medium"  v-if="report">
			<thead>
				<th>Controller</th>
				<th>CID</th>
				<th>Is Visitor?</th>
				<th>Rating</th>
				<th>Time</th>
				<th>Join Date</th>
			</thead>
			<tbody>
				<tr v-for="user of report" :class="[(user.tooLow)?'too_low':'',(user.protected)?'protected':'']" :key="user.cid">
					<td>{{user.fname}} {{user.lname}}</td>
					<td>{{user.cid}}</td>
					<td>{{user.vis?'Yes':'No'}}</td>
					<td>{{user.ratingShort}}</td>
					<td>{{secondsToHms(user.total)}}</td>
					<td>{{dLong(new Date(user.createdAt))}}</td>
				</tr>
			</tbody>
		</table>
		<div class="loading_container" v-else>
			<Spinner />
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';

export default {
	data() {
		return {
			report: null,
			chkDate: null
		};
	},
	async mounted() {
		const d = new Date();
		this.chkDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDay()-60));
		const {data: reportData} = await zabApi.get('/stats/activity');
		this.report = reportData.data;
	},
	methods: {
		secondsToHms: seconds => {
			const days = Math.floor(seconds / 86400);
			const remainderSeconds = seconds % 86400;
			const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19);
			return hms.replace(/^(\d+)/, h => `${Number(h) + days * 24}`.padStart(2, '0'));
		},
		sec2hms(secs) {
			if(!secs) return '00:00:00';
			let hours = Math.floor(secs / 3600);
			if(hours < 10) {
				hours = `00${hours}`.slice(-2);
			}
			const minutes = `0${Math.round((secs / 60) % 60)}`.slice(-2);
			const seconds = `0${secs % 60}`.slice(-2);
			return `${hours}:${minutes}:${seconds}`;
		},
	}
};
</script>

<style lang="scss" scoped>
	.too_low {
		background: rgba($secondary-color-dark, 0.25);
	}
	.protected {
		background: rgba($accent-color, 0.25);
	}
</style>