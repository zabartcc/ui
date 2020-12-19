<template>
	<div class="card" v-if="controllers">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Solo Certifications</span></div>
				<div class="card-title col s4"><router-link to="/ins/solo/new"><span class="btn new_event_button right">New Solo Cert</span></router-link></div>
			</div>
		</div>
		<p class="no_certs" v-if="certs.length === 0">There are no active solo certifications issued by ZAB.</p>
		<div class="table_wrapper" v-else>
			<table class="striped">
				<thead class="certs_list_head">
					<tr>
						<th>Controller</th>
						<th>Position</th>
						<th>Expires</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="certs_list_row">
					<tr v-for="cert in certs" :key="cert.id">
						<td>{{getName(cert.cid)}}</td>
						<td>{{cert.position}}</td>
						<td>{{cert.expires}}</td>
						<td class="options"><i class="material-icons red-text text-darken-2">delete</i></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import {vatusaApi, zabApi} from '@/helpers/axios.js';
export default {
	data() {
		return {
			positions: ['ABQ', 'PHX', 'TUS', 'ELP', 'AMA'],
			certs: [],
			controllers: null
		};
	},
	async mounted() {
		await this.getSoloCerts();
		await this.getControllers();
	},
	methods: {
		async getSoloCerts() {
			const {data} = await vatusaApi.get('/solo');
			data[0].forEach((object) => {
				if(this.positions.includes(object.position.slice(0,3))) {
					this.certs.push(object);
				}
			});
		},
		async getControllers() {
			const {data} = await zabApi.get('/feedback/controllers');
			this.controllers = data;
		},
		getName(cid2) {
			const controller = this.controllers.filter(i => { return i.cid === cid2; });
			return controller[0].fname + ' ' + controller[0].lname;
		}
	}
};
</script>

<style scoped lang="scss">
.row_no_margin {
	margin-bottom: 0;
}

.no_certs {
	padding: 1em;
	margin-top: -10px;
	font-style: italic;
}

.table_wrapper {
	width: 100%;
	overflow: hidden;
}

.options {
	text-align: right;
	width: 120px;
}
</style>