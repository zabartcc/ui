<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Solo Certifications</span></div>
				<div class="col s4"><router-link to="/ins/solo/new"><span class="btn new_event_button right">New</span></router-link></div>
			</div>
		</div>
		<div class="card-content loading_container" v-if="loading">
			<Spinner />
		</div>
		<p class="no_certs" v-else-if="!loading && !certs.length">There are no active solo certifications issued by ZAB</p>
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
						<td><router-link :to="`/controllers/${cert.cid}`" class="controller_link">{{ getName(cert.cid) }}</router-link></td>
						<td>{{ cert.position }}</td>
						<td>{{ cert.expires }}</td>
						<td class="options"><a :href="`#modal_delete_${i}`" class="modal-trigger red-text text-darken-2"><i class="material-icons">delete</i></a></td>
						<div :id="`modal_delete_${i}`" class="modal modal_delete">
							<div class="modal-content">
								<h4>Delete solo certification?</h4>
								<p>This will delete the solo certification for {{ getName(cert.cid) }} on {{ cert.position }} entirely.</p>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="deleteCert(cert.cid, cert.position)">Delete</a>
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
import { vatusaApiAuth, vatusaApi, zabApi } from '@/helpers/axios.js';

export default {
	name: 'SoloCerts',
	title: 'Solo Certifications',
	data() {
		return {
			positions: ['ABQ', 'PHX', 'TUS', 'ELP', 'AMA'],
			certs: [],
			controllers: null,
			loading: true
		};
	},
	async mounted() {
		await this.getSoloCerts();
		await this.getControllers();
		this.loading = false;
		
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	methods: {
		async getSoloCerts() {
			try {
				const { data } = await vatusaApi.get('/solo');
				for (const cert of data.data) {
					if(this.positions.includes(cert.position.slice(0, 3))) this.certs.push(cert);
				}
			} catch(e) {
				console.log(e);
			}
		},
		async getControllers() {
			try {
				const { data } = await zabApi.get('/feedback/controllers');
				this.controllers = data.data;
			} catch(e) {
				console.log(e);
			}
		},
		async deleteCert(cid, pos) {
			try {
				const formData = new FormData();
				formData.append('cid', cid);
				formData.append('position', pos);
				await vatusaApiAuth.delete('/solo', formData);

				this.toastSuccess('Solo Certification deleted');

				await this.getSoloCerts();
				this.$nextTick(() => {
					M.Modal.getInstance(document.querySelector('.modal_delete')).close();
				});
				
			} catch(e) {
				this.toastError('Something went wrong, please try again');
			}
		},
		getName(cid2) {
			const controller = this.controllers.filter((i) => i.cid === cid2);
			return controller[0].fname + ' ' + controller[0].lname;
		}
	}
};
</script>

<style scoped lang="scss">
.no_certs {
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

.table_wrapper {
	width: 100%;
	overflow: hidden;
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