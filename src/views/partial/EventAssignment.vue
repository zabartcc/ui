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
				You have requested these positions:<br />
				{{currentUserRequests || 'No preference'}}<br />
				<a href="#" @click.prevent="deleteRequest()" class="btn btn-small waves-effect waves-light">Delete Request</a>
			</div>
			<button v-else class="btn waves-effect waves-light modal-trigger" data-target="assignment_modal">Request Position</button>
		</div>
	</div>
	<div id="assignment_modal" class="modal assignment_modal">
		<div class="modal-content">
			<h4>Request Position</h4>
			<div class="chips chips-autocomplete chips-placeholder"></div>
			<p>The positions for this event will be assigned by the events coordinator. Please indicate up to three preferred positions above. If you do not have a preference, enter "Any". If there is a specific position not listed that you would like to work, you may manually enter it.</p>
			<p>Be advised, requests are just that — requests. The events coordinator may place you on any position depending on a multitude of factors.</p>
		</div>
		<div class="modal-footer">
			<a href="#" class="waves-effect waves-light btn" @click.prevent="addRequest()">SIGN UP</a>
			<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
		</div>
	</div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';
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
		};
	},
	mixins: [EventsMixin],
	mounted() {
		this.getPositions();

		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});

	},
	methods: {
		async getPositions() {
			this.event = await this.getPositionsMixin(this.$route.params.slug);

			this.positionCategories.enroute.positions =  this.event.positions.filter(position => ['CTR'].includes(position.type));
			this.positionCategories.tracon.positions = this.event.positions.filter(position => ['DEP', 'APP'].includes(position.type));
			this.positionCategories.local.positions = this.event.positions.filter(position => ['DEL', 'GND', 'TWR'].includes(position.type));

			const positions = this.event.positions.filter(pos => !pos.takenBy).map(pos => pos.pos);

			const posChipData = {'Any': null};

			positions.forEach(pos => posChipData[pos] = null);

			this.chips = M.Chips.init(document.querySelectorAll('.chips'), {
				placeholder: 'Select a position',
				secondaryPlaceholder: ' ',
				limit: 3,
				autocompleteOptions: {
					data: posChipData,
					minLength: 0,
					limit: 5
				}
			})[0];
		},
		async addRequest() {
			const requests = this.chips.chipsData.map(chip => chip.tag);
			const success = await this.putSignupMixin(this.$route.params.slug, this.user.data.cid, requests).catch(() => {
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Unable to request a position. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});

				return false;
			});
			if(success) {
				M.toast({
					html: '<i class="material-icons left">done</i> Request added successfully! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				await this.getPositions();
				setTimeout(() => M.Modal.getInstance(document.querySelector('#assignment_modal')).close(), 500);
			}
		},
		async deleteRequest() {
			const success = await this.deleteSignupMixin(this.$route.params.slug, this.user.data.cid).catch(() => {
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Unable to delete request. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});

				return false;
			});
			if(success) {
				M.toast({
					html: '<i class="material-icons left">done</i> Request deleted successfully! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success'
				});
				await this.getPositions();
			}
		}
	},
	computed: {
		...mapState('user', [
			'user'
		]),
		requestedPositions() {
			return this.event.signups.some(su => su.user.cid == this.user.data.cid);
		},
		assignedPositions() {
			return this.event.positions.some(su => su.takenBy && (su.takenBy.cid == this.user.data.cid));
		},
		currentUserRequests() {
			return this.event.signups.filter(su => su.user.cid == this.user.data.cid)[0].requests.join(', ');
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