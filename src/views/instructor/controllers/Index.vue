<template>
	<div class="card">
		<div class="card-content">
			<div class="row">
				<span class="card-title col s5 m8">Home Controllers</span>
				<div class="input-field col s7 m4">
					<input autocomplete="off" @keyup=filterControllers v-model=filter type="text" placeholder="Search for a controller...">
					<span class="helper-text right">You can search by CID, name, or operating initials.</span>
				</div>
			</div>
		</div>
		<div class="loading_container" v-if="!controllers">
			<Spinner />
		</div>
		<div class="table_wrapper" v-else>
			<table class="striped compact">
				<thead class="controller_list_head">
					<tr>
						<th>Controller</th>
						<th>CID</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="controller_list_row">
					<tr v-for="controller in controllersFiltered" :key="controller.cid">
						<td>
							<div class="name">
								<router-link :to="`/controllers/${controller.cid}`">{{controller.fname}} {{controller.lname}} ({{controller.oi}})</router-link>
							</div>
							<div class="rating">
								{{controller.ratingLong}}
							</div>
						</td>
						<td>
							<div class="cid">
								{{controller.cid}}
							</div>
						</td>
						<td class="options">
							<router-link data-position="top" data-tooltip="Edit Controller" class="tooltipped" :to="`/admin/controllers/${controller.cid}`"><i class="material-icons">edit</i></router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="card">
		<div class="card-content">
			<div class="row">
				<span class="card-title col s5 m8">Visiting Controllers</span>
				<div class="input-field col s7 m4">
					<input autocomplete="off" @keyup=filterVisitors v-model=filterVisit type="text" placeholder="Search for a controller...">
					<span class="helper-text right">You can search by CID, name, or operating initials.</span>
				</div>
			</div>
		</div>
		<div class="loading_container" v-if="!controllers">
			<Spinner />
		</div>
		<div class="table_wrapper" v-else>
			<table class="striped compact">
				<thead class="controller_list_head">
					<tr>
						<th>Controller</th>
						<th>CID</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="controller_list_row">
					<tr v-for="controller in visitorsFiltered" :key="controller.cid">
						<td>
							<div class="name">
								<router-link :to="`/controllers/${controller.cid}`">{{controller.fname}} {{controller.lname}} ({{controller.oi}})</router-link>
							</div>
							<div class="rating">
								{{controller.ratingLong}}
							</div>
						</td>
						<td>
							<div class="cid">
								{{controller.cid}}
							</div>
						</td>
						<td class="options">
							<router-link data-position="top" data-tooltip="Edit Controller" class="tooltipped" :to="`/admin/controllers/${controller.cid}`"><i class="material-icons">edit</i></router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import {ControllerMixin} from '@/mixins/ControllerMixin.js';
import Spinner from '@/components/Spinner.vue';

export default {
	data() {
		return {
			controllers: null,
			controllersFiltered: null,
			visitorsFiltered: null,
			filter: '',
			filterVisit: '',
			deleteReason: ''
		};
	},
	mixins: [ControllerMixin],
	components: {
		Spinner
	},
	async mounted() {
		await this.getControllers();
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getControllers() {
			const controllers = await this.getControllersMixin();
			this.controllers = controllers;
			this.controllersFiltered = controllers.home;
			this.visitorsFiltered = controllers.visiting;
		},
		filterControllers() {
			const search = new RegExp(this.filter, 'ig');
			this.controllersFiltered = this.controllers.home.filter(controller => {
				if(
					controller.fname.match(search) ||
					controller.lname.match(search) ||
					controller.oi.match(search) ||
					controller.cid.toString().match(search)
				) {
					return true;
				}
			});
		},
		filterVisitors() {
			const search = new RegExp(this.filterVisit, 'ig');
			this.visitorsFiltered = this.controllers.visiting.filter(controller => {
				if(
					controller.fname.match(search) ||
					controller.lname.match(search) ||
					controller.oi.match(search) ||
					controller.cid.toString().match(search)
				) {
					return true;
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
	.table_wrapper {
		width: 100%;
		overflow: auto;
	}
	.input-field {
		margin-top: 0;
	}
	.name {
		color: $primary-color;
		font-weight: 700;
	}
	.rating {
		font-weight: 400;
	}

	.options {
		text-align: right;
	}

	table tbody {
		tr {
			transition: background-color .3s ease;
			&:hover {
				background: #eaeaea;
			}
		}
	}

	.modal_delete {
		min-width: 340px;
		width: 30%;
	}

</style>