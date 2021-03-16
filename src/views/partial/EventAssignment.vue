<template>
	<div class="card signup-card" v-if="event">
		<div class="card-content">
			<span class="card-title">Position Assignments</span>
		</div>
		
		<EventAssignmentTable v-for="category in positionCategories" :category="category" :key="category" />

		<div class="card-content assignment_cta">
			<div v-if="!event.open || new Date(event.eventStart).getTime() < Date.now()" class="sign_up_err">Sign-ups for this event are now closed.</div>
			<div v-else-if="!user.data" class="sign_up_err">Please log in to sign up.</div>
			<div v-else-if="assignedPositions">You have been assigned a position. Contact the EC if you need to cancel.</div>
			<div v-else-if="requestedPositions" class="sign_up_err">
				You have requested<br />
				{{currentUserRequests || 'No preference'}}<br /><br />
				<a href="#" @click.prevent="deleteRequest()" class="btn btn-small waves-effect waves-light">Delete Request</a>
			</div>
			<button v-else class="btn waves-effect waves-light modal-trigger" data-target="assignment_modal">Request Position</button>
		</div>
		<div id="assignment_modal" class="modal assignment_modal">
			<div class="modal-content">
				<h4>Request Position</h4>
				<p>The positions for this event will be assigned by the events coordinator. Please indicate up to three preferred positions below. If you do not have a preference, enter "Any". If there is a specific position not listed that you would like to work, you may manually enter it.</p>
				<p>Please be advised that requests are just that — requests. The events coordinator may place you on any position depending on multiple factors.</p>
				<div class="chips chips-placeholder"></div>
			</div>
			<div class="modal-footer">
				<a href="#" class="waves-effect waves-light btn" @click.prevent="addRequest()">SIGN UP</a>
				<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import {mapState} from 'vuex';
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
		};
	},
	async mounted() {
		await this.getPositions();
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		this.chips = M.Chips.init(document.querySelector('.chips'), {
			placeholder: 'Select a position',
			secondaryPlaceholder: ' ',
			limit: 3
		});
	},
	methods: {
		async getPositions() {
			try {
				const {data} = await zabApi.get(`/event/${this.$route.params.slug}/positions`);
				this.event = data.data;

				this.positionCategories.enroute.positions =  this.event.positions.filter(position => ['CTR'].includes(position.type));
				this.positionCategories.tracon.positions = this.event.positions.filter(position => ['DEP', 'APP'].includes(position.type));
				this.positionCategories.local.positions = this.event.positions.filter(position => ['DEL', 'GND', 'TWR'].includes(position.type));

				
			} catch(e) {
				console.log(e);
			}
		},
		async addRequest() {
			try {
				const requests = this.chips.chipsData.map(chip => chip.tag);
				const {data} = await zabApi.put(`/event/${this.$route.params.slug}/signup`, {requests});
				if(data.ret_det.code === 200) {
					this.toastSuccess('Request successfully submitted.');
					await this.getPositions();
					this.$nextTick(() => {
						M.Modal.getInstance(document.querySelector('#assignment_modal')).close();
					});
				} else {
					M.toast({
						html: `<i class="material-icons left">error_outline</i> ${data.ret_det.message} <div class="border"></div>`,
						displayLength: 5000,
						classes: 'toast toast_error'
					});
				}
			} catch(e) {
				console.log(e);
			}
		},
		async deleteRequest() {
			try {
				while(this.chips.chipsData.length) {
					this.chips.deleteChip(0);
				}
				const {data} = await zabApi.delete(`/event/${this.$route.params.slug}/signup`);

				if(data.ret_det.code === 200) {
					this.toastSuccess('Request successfully deleted');
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
			return this.event.signups.some(su => su.cid == this.user.data.cid);
		},
		assignedPositions() {
			return this.event.positions.some(su => su.user && (su.user.cid == this.user.data.cid));
		},
		currentUserRequests() {
			return this.event.signups.filter(su => su.cid == this.user.data.cid)[0].requests.join(', ');
		}
	}
};
</script>

<style scoped lang="scss">

.assignment_cta {
	text-align: center;
}

.sign_up_err {
	line-height: 1.8;
}

.assignment_modal {
	min-width: 400px;
	width: 600px;

	.chips {
		height: 30px;
		margin-bottom: 2rem;
	}

	.dropdown-content {
		width:auto !important;
	}
}

.modal-footer {
	padding-left: 20px;
}

.chips.focus {
	border-bottom: 1px solid $primary-color-light;
	box-shadow: 0 1px 0 0 $primary-color-light;
}

</style>