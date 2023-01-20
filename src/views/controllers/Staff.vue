f<template>
	<div>
		<div class="card card_margin">
			<div class="card-content">
				<span class="card-title">ARTCC Staff</span>
				<div class="loading_container" v-if="!staff">
					<Spinner />
				</div>
				<div v-else>
					<!-- ARTCC STAFF ROW -->
					<div class="row">
						<div class="col s12 l4 push-l4">
							<StaffCard :staffItem="staff.atm" />
						</div>
					</div>
					<div class="row">
						<div class="col s1 push-s5 border_right hide-on-med-and-down"></div>
					</div>
					<div class="row">
						<div class="col s8 push-s2 border_top hide-on-med-and-down"></div>
					</div>
					<div class="row">
						<div class="col s1 push-s2 border_left hide-on-med-and-down"></div>
						<div class="col s5 border_right hide-on-med-and-down"></div>
						<div class="col s4 border_right hide-on-med-and-down"></div>
					</div>
					<div class="row">
						<div class="col s12 l4 push-l4">
							<StaffCard :staffItem="staff.datm" />
						</div>
						<div class="col s12 l4 pull-l4 cardta">
							<StaffCard :staffItem="staff.ta" />
						</div>
						<div class="col s12 l4">
							<StaffCard :staffItem="staff.wm" />
						</div>
					</div>
					<div class="row">
						<div class="col s1 push-s1 border_long2 hide-on-med-and-down"></div>
					</div>
					<div class="row">
						<div class="col s1 push-s5 border_long2 hide-on-med-and-down"></div>
						<div class="col s12 l4 pull-l1">
							<StaffCard :staffItem="staff.dta" />
						</div>
					</div>
					<div class="row">
						<div class="col s1 push-s5 border_long2 hide-on-med-and-down"></div>
						</div>
					<div class="row">
						<div class="col s6 push-s3 border_top hide-on-med-and-down"></div>
					</div>
					<div class="row">
						<div class="col s1 push-s3 border_left hide-on-med-and-down"></div>
						<div class="col s4 push-s4 border_right hide-on-med-and-down"></div>
					</div>
					<div class="row">
						<div class="col s12 l6">
							<StaffCard :staffItem="staff.ec" />
						</div>
						<div class="col s12 l6">
							<StaffCard :staffItem="staff.fe" />
						</div>
					</div>
				</div>
				<!-- END STAFF ROW -->
			</div>
		</div>
		<div class="card card_margin">
			<div class="card-content">
				<span class="card-title">Training Staff</span>
				<div class="loading_container" v-if="!staff">
					<Spinner />
				</div>
				<div v-else>
					<!-- TRANING STAFF ROW  -->
					<div class="row">
						<div class="col s12 l4 card-distance-trainigstaff ">
							<StaffCard :staffItem="staff.dta" />
						</div>
						<div class="col s12 l5 card-distance-trainigstaff">
							<StaffCard :staffItem="staff.ta" />
						</div>
						<!-- the middle line between position DTA and TA  -->
						<div class="col s6 push-s1 border_middle hide-on-med-and-down"></div>  
					</div>
					<div class="row">
						<div class="col s7 push-s1 border_right hide-on-med-and-down"></div>
					</div>
					<div class="row">
						<div class="col s6 push-s3 border_top hide-on-med-and-down"></div>
					</div>
					<div class="row">
						<div class="col s1 push-s3 border_left hide-on-med-and-down"></div>
						<div class="col s4 push-s4 border_right hide-on-med-and-down"></div>
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
	</div>
	
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import StaffCard from './StaffCard.vue';

export default {
	name: 'Staff',
	title: 'Staff',
	data() {
		return {
			staff: null
		};
	},
	components: {
		StaffCard
	},
	async mounted() {
		const { data } = await zabApi.get('/controller/staff');
		this.staff =  data.data;
	}
};
</script>

<style scoped lang="scss">
.row, .col {
	padding: 0;
	margin: 0;
}

.card {
	z-index: 1;
}

.card-distance-trainigstaff {
	// is use for distance between TA and DTA card
	margin: 0 5.7em;
}

.border_long2 {
	// is use for the big line under DATM 
	border-right: 3px solid $primary-color;
	height: 145px;
	margin-top: -95px;
	z-index: 0;
}

.card-content .card {
	margin: 0 .6em;

}

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

.border_right {
	border-right: 3px solid $primary-color;
	height: 70px;

}

.border_left {
	border-left: 3px solid $primary-color;
	height: 70px;
}

.border_dta {
	border-left: 3px solid $primary-color;
	height: 100px;
	
}

.border_middle {
	top: -50px;
	border-top: 3px solid $primary-color;
}

.border_long {
	height: 110px;
	margin-top: -85px;
	z-index: 0;
}

.border_top {
	border-top: 3px solid $primary-color;
}

.card_margin {
	margin: .5em 0 1em 0;
}

@media only screen and (max-width: 992px) {
	.card-content .card {
		width: 100%;
		margin: .5em 0 1em 0;
	}
} 
</style>