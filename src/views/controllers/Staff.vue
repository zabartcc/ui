<template>
	<div v-if=staff>
		<div class="card">
			<div class="card-content">
				<span class="card-title">ARTCC Staff</span>
				<div class="row">
					<div class="col s12 l4 push-l4">
						<StaffCard :staffItem="staff.atm" />
					</div>
				</div>
				<div class="row">
					<div class="col s12 l4">
						<StaffCard :staffItem="staff.ta" />
					</div>
					<div class="col s12 l4">
						<StaffCard :staffItem="staff.datm" />
					</div>
					<div class="col s12 l4">
						<StaffCard :staffItem="staff.wm" />
					</div>
				</div>
				<div class="row">
					<div class="col s12 l4 push-l2">
						<StaffCard :staffItem="staff.ec" />
					</div>
					<div class="col s12 l4 push-l2">
						<StaffCard :staffItem="staff.fe" />
					</div>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-content">
				<span class="card-title">Training Staff</span>
				<div class="row">
					<div class="col s12 l4 push-l4">
						<StaffCard :staffItem="staff.ta" />
					</div>
				</div>
				<div class="row">
					<div class="col s12 l6">
						<StaffCard :staffItem="staff.ins" />
					</div>
					<div class="col s12 l6">
						<StaffCard :staffItem="staff.mtr" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '@/helpers/axios.js';
import StaffCard from './StaffCard.vue';

export default {
	components: {
		StaffCard
	},
	data() {
		return {
			staff: null
		};
	},
	mounted() {
		axios.get('/controller/staff').then(({data}) => {
			this.staff = data;
			console.log(this.staff);
		});
	}
};
</script>

<style scoped lang="scss">
	.staff_table {
		tr {
			border-bottom: none;
		}
		td {
			width: 8.333333333333333%;
			box-sizing: border-box;
			padding: .25em 1em;
			vertical-align: top;
		}
	}
</style>