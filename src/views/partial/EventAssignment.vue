<template>
	<div class="card signup-card">
		<div class="card-content">
			<span class="card-title">Position Assignments</span>
		</div>
		<div class="card-content" v-if="!event">
			<Spinner />
		</div>
		<div v-else>
			<EventAssignmentTable v-for="category in positionCategories" :category="category" :key="category" />
			<div class="card-content assignment_cta">
				<div v-if="!event.open || new Date(event.eventStart).getTime() < Date.now()" class="sign_up_err">Sign-ups for this event are closed</div>
				<div v-else-if="!user.data" class="sign_up_err">Log in to sign up</div>
				<div v-else-if="user.data.member === false" class="sign_up_err">You are not a member of ZAB</div>
				<div v-else-if="assignedPositions" class="sign_up_err">You have been assigned a position. Contact the EC if you need to cancel.</div>
				<div v-else-if="requestedPositions" class="requested_pos">
					You have requested<br />
					{{ currentUserRequests || 'No preference' }}<br />
					<button @click="deleteRequest()" class="btn btn-small waves-effect waves-light btn_delete">Delete Request</button>
				</div>
				<button v-else class="btn waves-effect waves-light modal-trigger btn_signup" data-target="assignment_modal">Sign up</button>
			</div>
			<div id="assignment_modal" class="modal assignment_modal">
				<div class="modal-content">

					<div class="col s12">
						<h4>Sign up for {{ event.name }}</h4>
						<p>The positions for this event will be assigned by the Events Team. Please indicate up to three preferred positions below.</p>
						<p>Please be advised that requests are just that — requests. The Events Team may place you on any (or no) position depending on multiple factors.</p>
					</div>

					<div class="col s12">
						<label style="display: block;">1st Position Request</label>
						<select v-model="positionRequested1" class="materialize-select" style="opacity: 1;">
							<option value="" selected>Any</option>
							<option v-for="pos in positionsAvailable" :value="pos.pos">{{pos.pos}}</option>
						</select>
					</div>

					<div class="col s12" style="margin-top: 10px">
						<label style="display: block;">2nd Position Request</label>
						<select v-model="positionRequested2" class="materialize-select" style="opacity: 1;">
							<option value="" selected>Any</option>
							<option v-for="pos in positionsAvailable" :value="pos.pos">{{pos.pos}}</option>
						</select>
					</div>

					<div class="col s12" style="margin-top: 10px">
						<label style="display: block;">3rd Position Request</label>
						<select v-model="positionRequested3" class="materialize-select" style="opacity: 1;">
							<option value="" selected>Any</option>
							<option v-for="pos in positionsAvailable" :value="pos.pos">{{pos.pos}}</option>
						</select>
					</div>
				</div>
				<div class="modal-footer" style="margin-bottom: 15px">
					<a href="#" class="waves-effect waves-light btn" @click.prevent="addRequest()">Sign up</a>
					<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import { mapState } from 'vuex';
import EventAssignmentTable from './EventAssignmentTable.vue';

export default {
	components: {
		EventAssignmentTable
	},
	data() {
		return {
			event: null,
			positionCategories: {
				enroute: {
					title: "Enroute",
					positions: null
				},
				tracon: {
					title: "TRACON",
					positions: null
				},
				local: {
					title: "Local",
					positions: null
				}
			},
			positionsAvailable: [],
			positionRequested1: "",
			positionRequested2: "",
			positionRequested3: ""
		};
	},
	async mounted() {
		await this.getPositions();
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	methods: {
		async getPositions() {
			try {
				const {data} = await zabApi.get(`/event/${this.$route.params.slug}/positions`);
				this.event = data.data;

				if(this.event.positions !== null) {
					this.positionCategories.enroute.positions =  this.event.positions.filter(position => ['CTR'].includes(position.type));
					this.positionCategories.tracon.positions = this.event.positions.filter(position => ['DEP', 'APP'].includes(position.type));
					this.positionCategories.local.positions = this.event.positions.filter(position => ['DEL', 'GND', 'TWR'].includes(position.type));
					this.positionsAvailable = this.event.positions;
				}
			} catch(e) {
				console.log(e);
			}
		},
		async addRequest() {
			try {
				const body = 
				{
					requests: [this.positionRequested1, this.positionRequested2, this.positionRequested3]
				};

				const { data } = await zabApi.put(`/event/${this.$route.params.slug}/signup`, body);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Request submitted');

					await this.getPositions();
					this.$nextTick(() => {
						M.Modal.getInstance(document.querySelector('#assignment_modal')).close();
					});
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		async deleteRequest() {
			try {

				const { data } = await zabApi.delete(`/event/${this.$route.params.slug}/signup`);

				if(data.ret_det.code === 200) {
					this.toastSuccess('Request deleted');
					await this.getPositions();
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		}
	},
	computed: {
		...mapState('user', [
			'user'
		]),
		requestedPositions() {
			if(this.event.signups) return this.event.signups.some((su) => su.cid === this.user.data.cid);
			else return false;
		},
		assignedPositions() {
			if(this.event.positions) return this.event.positions.some((su) => su.user && (su.user.cid === this.user.data.cid));
			else return false;
		},
		currentUserRequests() {
			if(this.event.signups) return this.event.signups.filter((su) => su.cid == this.user.data.cid)[0].requests.join(`, `);
			else return false;
		}
	}
};
</script>

<style scoped lang="scss">
.assignment_cta {
	padding: 1em!important;
	text-align: center;
}

.sign_up_err, .btn_signup {
	margin-top: -1em;
}

.requested_pos {
	margin-top: -1em;
	line-height: 1.8;
}

.assignment_modal {
	.chips {
		height: 30px;
		margin-bottom: 2rem;
	}

	.dropdown-content {
		width: auto!important;
	}
}

.btn_delete {
	margin-top: .5em;
}

.modal-footer {
	padding-left: 20px;
}

.chips.focus {
	border-bottom: 1px solid $primary-color-light;
	box-shadow: 0 1px 0 0 $primary-color-light;
}
</style>