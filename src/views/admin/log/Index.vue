<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Action Log</span>
		</div>
		<table class="striped highlight" v-if=log>
			<thead>
				<th>Date</th>
				<th>Action</th>
			</thead>
			<tbody>
				<tr v-for='item in log' :key=item._id>
					<td>{{dtStandard(item.createdAt)}}</td>
					<td v-html='populateLog(item)'></td>
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
	title: "Action Log",
	data() {
		return {
			log: null
		};
	}, 
	async mounted() {
		const {data: dossierData} = await zabApi.get('/controller/log');
		this.log = dossierData.data;
	},
	methods: {
		populateLog(log) {
			let action = log.action;
			if(action.match(/%b/)) {
				action = action.replace(/%b/, `<strong>${log.userBy.fname} ${log.userBy.lname}</strong>`);
			}
			if(action.match(/%a/)) {
				action = action.replace(/%a/, `<strong>${log.userAffected.fname} ${log.userAffected.lname}</strong>`);
			}
			if(action.match(/\*.+\*/)) {
				action = action.replace(/\*(.+)\*/, `<strong>$1</strong>`);
			}
			return action;
		}
	}
};
</script>

<style scoped lang="scss">
th {
	padding: .75em 1em;
}
</style>