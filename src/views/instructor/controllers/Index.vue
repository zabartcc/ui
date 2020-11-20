<template>
	<div v-if=controllers class="card">
		<div class="card-content">
			<div class="row">
				<span class="card-title col s5 m8">Controllers</span>
				<div class="input-field col s7 m4">
					<input autocomplete="off" @keyup=filterControllers v-model=filter type="text" placeholder="Search for a controller...">
					<span class="helper-text right">You can search by CID, name, or operating initials.</span>
				</div>
			</div>
		</div>
		<div class="table_wrapper">
			<table class="striped compact">
				<thead class="controller_list_head">
					<tr>
						<th>Controller</th>
						<th>CID</th>
						<th class="options">Management</th>
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
						<td class="training">
							<i class="material-icons">stars</i>
							<i class="material-icons">assignment</i>
							<i class="material-icons">comment</i>
						</td>
						<td class="options">
							<router-link data-position="top" data-tooltip="Edit Controller" class="tooltipped" :to="`/admin/controllers/${controller.cid}`"><i class="material-icons">edit</i></router-link>
							<i class="material-icons">delete</i>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { ControllerMixin } from '@/mixins/ControllerMixin.js';
import { vatusaApi } from '@/helpers/axios.js';

export default {
	data() {
		return {
			controllers: null,
			controllersFiltered: null,
			filter: '',
			vatusa: null
		};
	},
	mixins: [ControllerMixin],
	async mounted() {
		await this.getControllers();
		await this.testApiCall();
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getControllers() {
			this.controllers = await this.getControllersMixin();
			this.controllersFiltered = await this.getControllersMixin();
		},
		async testApiCall() {
			this.vatusa = await vatusaApi.get('/user/1374893/exam/history').then(response => response.data).catch((err) => console.log(err));
		},
		filterControllers() {
			const search = new RegExp(this.filter, 'ig');
			this.controllersFiltered = this.controllers.filter(controller => {
				console.log(controller);
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
		width: 120px;
	}

	.training {
		text-align: center;
		width: 20%;
	}

	table {
		table-layout: fixed
	}

	table tbody {
		tr {
			transition: background-color .3s ease;
			&:hover {
				background: #eaeaea;
			}
		}
	}

</style>