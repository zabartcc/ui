<template>
	<div class="card signup-card" v-if="event">
		<div class="card-content">
			<span class="card-title">Position Assignments</span>
			<div class="assignment-title title-first">Enroute</div>
			<p class="no-pos" v-if="event[0].positions.filter(position => position.type == 'CTR').length == 0">There are no enroute positions for this event.</p>
			<table class="assignment_list striped" v-else>
				<tbody class="assignment_list_row">
					<tr v-for="center in event[0].positions.filter(position => position.type == 'CTR')" :key="center.id">
						<td class="position-name">
							{{center.pos}}
						</td>
						<td class="position-taken right">
							{{check_taken(center.taken)}}
						</td>
					</tr>
				</tbody>
			</table>
			<div class="assignment-title">TRACON</div>
			<p class="no-pos" v-if="event[0].positions.filter(position => position.type == 'APP').length == 0">There are no TRACON positions for this event.</p>
			<table class="assignment_list striped" v-else>
				<tbody class="assignment_list_row">
					<tr v-for="approach in event[0].positions.filter(position => position.type == 'APP')" :key="approach.id">
						<td class="position-name">
							{{approach.pos}}
						</td>
						<td class="position-taken right">
							{{check_taken(approach.taken)}}
						</td>
					</tr>
				</tbody>
			</table>
			<div class="assignment-title">Local</div>
			<p class="no-pos" v-if="event[0].positions.filter(position => position.type == 'TWR' || position.type == 'GND' || position.type == 'DEL').length == 0">There are no local positions for this event.</p>
			<table class="assignment_list striped" v-else>
				<tbody class="assignment_list_row">
					<tr v-for="local in event[0].positions.filter(position => position.type == 'TWR' || position.type == 'GND' || position.type == 'DEL')" :key="local.id">
						<td class="position-name">
							{{local.pos}}
						</td>
						<td class="position-taken right">
							{{check_taken(local.taken)}}
						</td>
					</tr>
				</tbody>
			</table>
			<button v-if="user.data && event[0].open == true && signedUp == false" class="btn assignment-signup modal-trigger" data-target="assignment-modal">Sign up</button>
			<div v-else-if="user.data && event[0].open == true & signedUp == true" class="assignment-not-login">You already signed up. <a href="#" @click="cancelSignup(this.$route.params.id, user.data._id)">Cancel?</a></div>
			<div v-else-if="!user.data && event[0].open == true" class="assignment-not-login">Please log in to sign up.</div>
			<div v-else class="assignment-not-login">Sorry, but sign ups for this event are closed.</div>
		</div>
	</div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			event: null
		};
	},
	mixins: [EventsMixin],
	mounted() {
		this.getPositions();

		M.Chips.init(document.querySelectorAll('.chips'), {
			placeholder: 'Select a position',
			secondaryPlaceholder: ' ',
			limit: 3,
			autocompleteOptions: {
				data: {
					'ABQ_NE_CTR': null,
					'ABQ_NW_CTR': null,
					'ABQ_SW_CTR': null,
					'ABQ_SE_CTR': null
				},
				limit: 5
			}
		});
	},
	methods: {
		async getPositions() {
			this.event = await this.getPositionsMixin(this.$route.params.id);
		},
		async cancelSignup(event, user) {
			var outcome = await this.cancelSignupMixin(event, user);
			if(outcome.signup.nModified >= 1) {
				M.toast({
					html: '<div><i class="material-icons">check</i> You are no longer signed up for this event.</div>',
					displayLength: 5000,
					classes: 'toast-success green'
				});
				this.event = await this.getPositionsMixin(this.$route.params.id);
			} else {
				M.toast({
					html: '<div><i class="material-icons">error</i> Something went wrong. Please try again.</div>',
					displayLength: 5000,
					classes: 'toast-success red'
				});
			}
		},
		check_taken(value) {
			if(value) return value.fname + ' ' + value.lname;
			else return 'Unassigned';
		}
	},
	computed: {
		...mapState('user', [
			'user'
		]),
		signedUp() {
			if(this.event[0].signups.some(o => o.user.cid == this.user.data.cid)) return true;
			else return false;
		}
	}
};
</script>

<style scoped lang="scss">
.assignment_list_row {
		padding: 15px!important;
	}

.assignment_list_row tr {
	transition: background-color 0.3s ease;

	&:nth-child(odd) {
		background-color: rgba(242,242,242,0.6)!important;
	}
	&:hover {
		background-color: rgba(242,242,242,0.6);
	}
}

.signup-card .card-content {
	padding: 0 0 15px 0!important;
}

.signup-card .card-title {
	padding: 15px;
}

tr th {
	text-align: left!important;
}

td {
	padding: 5px 15px 5px 15px!important;
}

td a {
	transition: .5s;
	&:hover {
		color: $primary-color-light;
	}
}

.event-card .card-content .row {
	margin-bottom: 0!important;
}

.assignment-title {
	margin-left: 15px!important;
	margin-top: 20px;
	font-weight: bold;
}

.signup-card .card-title {
	margin-bottom: 0!important;
}

.title-first {
	margin-top: 0!important;
}

.assignment-not-login {
	font-style: italic;
	padding: 1em 0 .5em 0;
	text-align: center;

	a {
		color: $primary-color;
		font-weight: 700;

		&:hover {
			color: $primary-color-light;
		}
	}
}

.assignment-signup {
	display: block;
	width: 200px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 30px;
}

.no-pos {
	font-style: italic;
	padding-left: 1em;
}
</style>