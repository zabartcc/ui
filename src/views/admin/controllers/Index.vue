<template>
	<div v-if=controllers class="card">
		<div class="card-content">
			<div class="row">
				<span class="card-title col s4 m6">Controllers</span>
				<div class="input-field col s8 m6">
					<input autocomplete="off" @keyup=filterControllers v-model=filter type="text" placeholder="Search for a controller...">
					<span class="helper-text right">You can search by CID, name, or operating initials.</span>
				</div>
			</div>
		</div>
		<table class="striped hover compact">
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
						<router-link data-position="top" data-tooltip="Edit Controller" class="tooltipped" :to="`/admin/controllers/${controller.cid}`">
							<i class="material-icons">edit</i>
						</router-link>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { ControllerMixin } from '@/mixins/ControllerMixin.js';

export default {
	data() {
		return {
			controllers: null,
			controllersFiltered: null,
			filter: ''
		};
	},
	mixins: [ControllerMixin],
	methods: {
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
	},
	async mounted() {
		this.controllers = await this.getControllersMixin();
		this.controllersFiltered = await this.getControllersMixin();
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	}
};
</script>

<style scoped lang="scss">
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
</style>