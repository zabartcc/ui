<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Action Log</span>
		</div>
		<div class="actions_wrapper" v-if=log>
			<table class="striped highlight">
				<thead>
					<th class="date">Date</th>
					<th>Action</th>
				</thead>
				<tbody>
					<tr v-for="item in log" :key=item._id>
						<td class="date">{{dtStandard(item.createdAt)}}z</td>
						<td v-html='populateLog(item)'></td>
					</tr>
				</tbody>
			</table>
			<div v-if="log && logAmount !== 0">
				<Pagination :amount="logAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
			</div>
		</div>
		<div class="loading_container" v-else>
			<Spinner />
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Pagination from '@/components/Pagination.vue';

export default {
	title: "Action Log",
	data() {
		return {
			log: null,
			logAmount: 0,
			page: 1,
			limit: 20,
			amountOfPages: 0
		};
	}, 
	components: {
		Pagination
	},
	async mounted() {
		await this.getLog();
	},
	methods: {
		async getLog() {
			const {data: dossierData} = await zabApi.get('/controller/log', {
				params: {
					page: this.page, 
					limit: this.limit
				}
			});
			this.log = dossierData.data.dossier;
			this.logAmount = dossierData.data.amount;
			this.amountOfPages = Math.ceil(this.logAmount / this.limit);
		},
		populateLog(log) {
			let action = log.action;
			if(action.match(/%b/)) {
				action = action.replace(/%b/, `<strong>${log.userBy.fname} ${log.userBy.lname}</strong>`);
			}
			if(action.match(/%a/)) {
				action = action.replace(/%a/, `<strong>${log.userAffected.fname} ${log.userAffected.lname}</strong>`);
			}
			if(action.match(/\*([^*]+)\*/g)) {
				action = action.replace(/\*([^*]+)\*/g, `<strong>$1</strong>`);
			}
			return action;
		}
	},
	watch: {
		page: async function() {
			await this.getLog();
		}
	}
};
</script>

<style scoped lang="scss">
th {
	padding: .75em 1em;
}

.date {
	width: 170px;
}
</style>