<template>
	<div>
		<div class="card">
			<div class="card-content">
				<div class="row row_no_margin">
					<span class="card-title col s12 m8">Controllers</span>
					<div class="input-field col s12 m4">
						<input autocomplete="off" @keyup="filterControllers" v-model="filter" type="text" placeholder="Search for a controller">
						<span class="helper-text right">Search by CID, name, or operating initials</span>
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
								<i class="material-icons right type_controller">{{ controller.vis ? 'work' : 'home' }}</i>
								<div class="name">
									<router-link :to="`/controllers/${controller.cid}`">{{ controller.fname }} {{ controller.lname }} ({{ controller.oi }})</router-link>
								</div>
								<div class="rating">
									{{ controller.ratingLong }}
								</div>
							</td>
							<td>
								<div class="cid">
									{{ controller.cid }}
								</div>
							</td>
							<td class="options">
								<router-link data-position="top" data-tooltip="View Training Sessions" class="tooltipped" :to="`/ins/training/sessions/${controller.cid}`"><i class="material-icons">assignment</i></router-link>
								<router-link data-position="top" data-tooltip="Edit Controller" class="tooltipped" :to="`/ins/controllers/${controller.cid}`"><i class="material-icons">edit</i></router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	name: 'Controllers',
	title: 'Controllers',
	data() {
		return {
			controllers: null,
			controllersFiltered: null,
			filter: ''
		};
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
			const { data } = await zabApi.get('/controller');
			this.controllers = data.data.home.concat(data.data.visiting);
			this.controllers = this.controllers.filter(c => c.member);
			this.controllersFiltered = this.controllers;
		},
		filterControllers() {
			const search = new RegExp(this.filter, 'ig');
			this.controllersFiltered = this.controllers.filter((controller) => {
				if (
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

.type_controller {
	vertical-align: top;
	margin-top: .4em;
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