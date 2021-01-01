<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Solo Certifications</span></div>
				<div class="card-title col s4"><router-link to="/ins/solo/new"><span class="btn new_event_button right">New Solo Cert</span></router-link></div>
			</div>
		</div>
		<div class="card-content loading" v-if="certs === null">
			<Spinner />
		</div>
		<p class="no_certs" v-else-if="certs.length === 0">There are no active solo certifications issued by ZAB.</p>
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
					<tr v-for="(cert, i) in certs" :key="cert.id">
						<td><router-link :to="`/controllers/${cert.cid}`" class="controller_link">{{getName(cert.cid)}}</router-link></td>
						<td>{{cert.position}}</td>
						<td>{{cert.expires}}</td>
						<td class="options"><a :href="`#modal_delete_${i}`" class="modal-trigger red-text text-darken-2"><i class="material-icons">delete</i></a></td>
						<div :id="`modal_delete_${i}`" class="modal modal_delete">
						<div class="modal-content">
							<h4>Are you sure?</h4>
							<p>This will delete the solo certification for {{getName(cert.cid)}} on {{cert.position}} entirely.</p>
						</div>
						<div class="modal-footer">
							<a href="#!" class="waves-effect btn" @click="deleteCert(cert.cid, cert.position)">I'm sure</a>
							<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
						</div>
					</div>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import {vatusaApiAuth, zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

export default {
	data() {
		return {
			positions: ['ABQ', 'PHX', 'TUS', 'ELP', 'AMA'],
			certs: null,
			controllers: null
		};
	},
	async mounted() {
		await this.getSoloCerts();
		await this.getControllers();
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	components: {
		Spinner
	},
	methods: {
		async getSoloCerts() {
			const {data} = await vatusaApiAuth.get('/solo');
			this.certs = [];
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
		async deleteCert(cid, pos) {
			const formData = new FormData();
			formData.append('cid', cid);
			formData.append('position', pos);
			vatusaApiAuth.delete('/solo', formData).then(async () => {
				M.toast({
					html: '<i class="material-icons left">done</i> Solo cert succesfully revoked <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				await this.getSoloCerts();
			}).catch((err) => {
				console.log(err);
				M.toast({
					html: `<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			});
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

.loading {
	width: 500px;
	text-align: center;
	margin: auto;
}

.modal_delete {
	min-width: 400px;
	width: 30%;
}

.controller_link {
	font-weight: 700;
	color: $primary-color;
	
	&:hover {
		color: $primary-color-light;
	}
}
</style>