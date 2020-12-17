<template>
	<div class="card">
		<div class="card-content" v-if="event">
			<div class="card-title">Event Sign-ups</div>
			<button class="btn right btn_add_signup modal-trigger" data-target="modal_add_signup"><i class="material-icons">add</i></button>
			<div class="no_signups" v-if="event.signups.length == 0">There have been no sign-ups for this event yet.</div>
			<div class="signups_container" v-else>
				<div class="signups_user card" v-for="signup in event.signups" :key="signup.id">
					<div class="signups_delete" @click="deleteSignup(signup.user.cid)"><i class="material-icons">close</i></div>
					<div class="signups_name">{{`${signup.user.fname} ${signup.user.lname}`}}</div>
					<div class="signups_rating">{{signup.user.ratingLong}}</div>
					<div class="signups_prefs">
						<div class="prefs_title">Preferences</div>
						<p v-if="signup.requests.length == 0">None</p>
						<div class="chip" v-for="(request, i) in signup.requests" :key="`${i}-${request}`">
							{{request}}
						</div>
					</div>
					<div class="signups_assignment">
						<label>Assignment</label>
						<select class="browser-default" @change="assignPos($event, signup.user.id)">
							<option :selected="checkAssigned(signup.user.id) == false">No assignment</option>
							<option v-for="position in filterPos(signup.user.certifications)" :key="position.id" :value="position.pos" :selected="checkAssigned(signup.user.id) == position.pos">{{position.pos}}</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12 signups_submit">
					<button type="submit" class="btn right" @click="closeSignups" :disabled="event.open == false">Close</button>
					<button type="submit" class="btn right modal-trigger" data-target="modal_notify" :disabled="event.signups.length == 0 || event.submitted == true">Notify</button>
					<button type="submit" class="btn right" @click="saveAssignments" :disabled="event.signups.length == 0">Save</button>
				</div>
			</div>
			<div id="modal_notify" class="modal">
				<div class="modal-content">
					<h4>Are you sure?</h4>
					<p>By clicking notify, you will send out an email to all controllers who signed up, informing them of the position assignments. You can still make changes to the position assignments after clicking the notify button.</p>
				</div>
				<div class="modal-footer">
					<a href="#!" class="waves-effect btn" @click="notifyAssignments">Notify</a>
					<a href="#!" class="waved-effect modal-close btn-flat">Cancel</a>
				</div>
			</div>
			<div id="modal_add_signup" class="modal">
				<div class="modal-content">
					<h4>Manually add sign-up</h4>
					<p>Enter a CID to manually add a controller to this page and to assign them a position. Please note that if the controller is not on our roster, they (currently) cannot be added on here due to technical limitations.</p>
					<div class="row cid_check">
						<form @submit.prevent=addSignup>
							<div class="input-field col s12 m6">
								<input type="text" id="cid" v-model="cid" required />
								<label for="cid" class="active">Controller ID</label>
							</div>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<a href="#!" class="waves-effect btn" @click="addSignup">Add</a>
					<a href="#!" class="waved-effect modal-close btn-flat">Cancel</a>
				</div>
			</div>
		</div>
		<div class="card-content loading" v-else>
			<h5>Loading event sign-ups...</h5>
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';
import { zabApi } from '@/helpers/axios.js';

export default {
	data() {
		return {
			event: null,
			cid: null
		};
	},
	mixins: [EventsMixin],
	methods: {
		async getEventData() {
			const data = await this.getPositionsMixin(this.$route.params.slug);
			this.event = data;
		},
		async saveAssignments() {
			const positions = this.event.positions;
			this.saveAssignmentsMixin(this.$route.params.slug, positions).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Positions succesfully assigned! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success'
				});
				this.getEventData();
			}).catch((err) => {
				console.log(err);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error',
				});
			});
		},
		async notifyAssignments() {
			const positions = this.event.positions;
			this.notifyAssignmentsMixin(this.$route.params.slug, positions).then(async () => {
				M.toast({
					html: '<i class="material-icons left">done</i> All controllers were successfully notified! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success'
				});
				await this.getEventData();
				setTimeout(() => M.Modal.getInstance(document.querySelector('#modal_notify')).close(), 500);
			}).catch((err) => {
				console.log(err);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error',
				});
			});
		},
		async addSignup() {
			zabApi.put(`/event/${this.$route.params.slug}/mansignup/${this.cid}`).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Sign-up successfully added! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success'
				});
				this.getEventData();
				this.cid = null;
				setTimeout(() => M.Modal.getInstance(document.querySelector('#modal_add_signup')).close(), 500);
			}).catch((err) => {
				console.log(err);
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${err.response.data} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error',
				});
			});
		},
		async deleteSignup(cid) {
			this.deleteSignupMixin(this.$route.params.slug, cid).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Sign-up successfully deleted. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success'
				});
				this.getEventData();
			}).catch((err) => {
				console.log(err);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error',
				});
			});
		},
		async closeSignups() {
			this.closeSignupsMixin(this.$route.params.slug).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Sign-ups successfully closed! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success'
				});
				this.getEventData();
			}).catch((err) => {
				console.log(err);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error',
				});
			});
		},
		assignPos(e, user) {
			const alreadyAssigned = this.event.positions.filter((pos) => { return typeof pos.takenBy === 'object' && pos.takenBy !== null && pos.takenBy.id == user;});
			if(alreadyAssigned.length > 0) {
				alreadyAssigned.forEach((pos) => {
					pos.takenBy = null;
				});
			}
			let pos = e.target.value;
			let index = this.event.positions.findIndex((obj => obj.pos == pos));
			this.event.positions[index].takenBy = user;
		},
		filterPos(userCerts) {
			let certsArray = [];
			userCerts.forEach(cert => certsArray.push(cert.code));
			return this.event.positions.filter((pos) => { return certsArray.includes(pos.code); });
			// This can probably be done better. Help.
			// I need this to return the positions where position.code === (one of the) userCerts.code (userCerts is an array)
		},
		checkAssigned(user) {
			const taken = this.event.positions.filter((pos => { return typeof pos.takenBy === 'object' && pos.takenBy !== null && pos.takenBy.id == user;}));
			if(taken.length > 0) {
				return taken[0].pos;
			} else {
				return false;
			}
		}
	},
	async mounted() {
		await this.getEventData();
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	}
};
</script>

<style scoped lang="scss">

.card-content{ 
	padding: 0;
}

.no_signups {
	font-style: italic;
	padding: 1em;
}

.card-title {
	padding-left: .5em;
	padding-top: .5em;
}

.signups_container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: .5em;
}

.signups_user {
	padding: 1em;
	margin: .5em;
	width: 300px;

	.signups_delete {
		position: absolute;
		right: .3em;
		top: .5em;
		cursor: pointer;
	}

	.signups_name {
		font-weight: 600;
		font-size: 1.1rem;
	}

	.signups_rating {
		font-weight: 300;
		margin-top: -3px;
	}

	.prefs_title {
		margin-top: 10px;
		color: #9e9e9e;
		font-size: .8rem;
	}
	.signups_prefs {
		min-height: 92px;

		.chip {
			user-select: none;
		}
	}
}

.signups_submit {
	padding: .5em 1.5em;

	button {
		margin: .25em;
	}
}

.loading {
	text-align: center;
	padding: 1em;
}

.progress {
	max-width: 500px;
	margin: 0 auto;
}

#modal_notify {
	min-width: 340px;
	width: 30%;
}

.btn_add_signup {
	margin: -40px 1em 0 1em;
	padding: 0 .75em;
}

#modal_add_signup {
	min-width: 340px;
	width: 30%;

	.cid_check {
		margin-top: 20px;
	}
}

</style>