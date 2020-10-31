<template>
	<div v-if=controllers class="card">
		<div class="card-content">
			<span class="card-title">Find a Controller</span>
		</div>
        <div class="input-field col s6">
			<input autocomplete="off" @keyup=filterControllers v-model=filter type="text">
			<label for="email">Search for a Controller</label>
			<span class="helper-text">You can search by CID, First Name, Last Name or Operating Initials</span>
        </div>
		<table class="striped hover compact">
			<thead class="controller_list_head">
				<tr>
					<th>Controller</th>
					<th>Options</th>
				</tr>
			</thead>
			<tbody class="controller_list_row">
				<tr v-for="controller in controllersFiltered" :key="controller.cid">
					<td>
						<div class="name">
							{{controller.fname}} {{controller.lname}} ({{controller.oi}})
						</div>
						<div class="cid">
							{{controller.cid}}
						</div>
						<div class="rating">
							{{controller.ratingLong}}
						</div>
					</td>
					<td>
						<router-link data-position="top" data-tooltip="Edit Controller" class="tooltipped" :to="`/admin/controllers/${controller.cid}`">
							<i class="material-icons small">edit</i>
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
		const tooltips = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
		console.log(tooltips);
	}
};
</script>

<style scoped lang="scss">
	.input-field {
		margin-top: 0;
	}
	.name {
		font-size: 1.2rem;
	}
	.cid {
		font-weight: 700;
	}
</style>