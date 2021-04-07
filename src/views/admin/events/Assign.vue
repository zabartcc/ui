<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Position Assignments {{event !== null ? `– ${event.name}` : ''}}</span>
			<button class="btn right btn_add_signup modal-trigger" data-target="modal_add_signup"><i class="material-icons">add</i></button>
		</div>
		<div class="loading_container" v-if="event === null">
			<Spinner />
		</div>
		<div class="no_signups" v-else-if="event && (!event.signups || event.signups.length === 0)">
			There have been no sign-ups for this event yet.
		</div>
		<div class="signups_wrapper" v-else>
			<table class="signups_list striped">
				<thead class="signups_list_head">
					<tr>
						<th>Controller</th>
						<th>Preferences</th>
						<th>Position</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="signups_list_row">
					<tr v-for="signup in event.signups" :key="signup._id">
						<td>
							<span class="signup_name">{{signup.user.fname}} {{signup.user.lname}}</span> <br />
							<span class="signup_rating">{{signup.user.ratingLong}}</span>
						</td>
						<td>
							{{signup.requests.join(',  ')}}
						</td>
						<td>
							<select @change="assignPos($event, signup.user.cid)">
								<option :selected="getAssignment(signup.user.cid) == false">No assignment</option>
								<option v-for="position in event.positions" :key="position" :value="position.pos" :selected="getAssignment(signup.user.cid) === position.pos">{{position.pos}}</option>
							</select>
						</td>
						<td class="options">
							<i class="material-icons red-text text-darken-2" @click="deleteSignup(signup.user.cid)">delete</i>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="row row_no_margin">
				<div class="input-field col s12 signups_submit">
					<button type="submit" class="btn right" @click="closeSignups" :disabled="event.open == false">Close</button>
					<button type="submit" class="btn right modal-trigger" data-target="modal_notify" :disabled="event.signups.length == 0 || event.submitted == true">Notify</button>
					<button type="submit" class="btn-flat right" @click="saveAssignments" :disabled="event.signups.length == 0">Save</button>
				</div>
			</div>
		</div>
		<div id="modal_add_signup" class="modal">
			<div class="modal-content">
				<h4>Manually add sign-up</h4>
				<p>Enter a CID to manually sign a controller up for this event. Please note that the controller is not a home or visiting controller, they cannot be added.</p>
				<div class="row row_no_margin">
					<form @submit.prevent=addSignup>
						<div class="input-field col s12">
							<input type="text" id="cid" v-model="cid" required />
							<label for="cid">Controller ID</label>
						</div>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<a href="#!" class="waves-effect btn" @click="addSignup">Add</a>
				<a href="#!" class="waved-effect modal-close btn-flat">Cancel</a>
			</div>
		</div>
		<div id="modal_notify" class="modal">
			<div class="modal-content">
				<h4>Are you sure?</h4>
				<p>By clicking notify, an email will be send out to all controllers that signed up with the position assignments.  You can still make changes to the assignments after clicking notify.  You cannot undo the email.</p>
			</div>
			<div class="modal-footer">
				<a href="#!" class="waves-effect btn" @click="notifyAssignments">Notify</a>
				<a href="#!" class="waved-effect modal-close btn-flat">Cancel</a>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'EventAssignments',
	data() {
		return {
			event: null,
			cid: null
		};
	},
	async mounted() {
		await this.getEventData();
		this.setTitle(`Position Assignments - ${this.event.name}`);
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	methods: {
		async getEventData() {
			const {data} = await zabApi.get(`/event/${this.$route.params.slug}/positions`);
			this.event = data.data;
		},
		async saveAssignments() {
			try {
				const positions = this.event.positions;
				const {data} = await zabApi.put(`/event/${this.$route.params.slug}/assign`, {
					assignment: positions
				});

				if(data.ret_det.code === 200) {
					this.toastSuccess('Position assignments successfully saved');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
			
		},
		async notifyAssignments() {
			try {
				const {data} = await zabApi.put(`/event/${this.$route.params.slug}/notify`, {
					assignment: this.event.positions
				});

				if(data.ret_det.code === 200) {
					this.toastSuccess('Controllers successfully notified');

					await this.getEventData();
					setTimeout(() => M.Modal.getInstance(document.querySelector('#modal_notify')).close(), 500);
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		async addSignup() {
			try {
				const {data} = await zabApi.put(`/event/${this.$route.params.slug}/mansignup/${this.cid}`);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Sign-up successfully added');

					await this.getEventData();
					this.cid = null;
					M.FormSelect.init(document.querySelectorAll('select'), {});
					setTimeout(() => M.Modal.getInstance(document.querySelector('#modal_add_signup')).close(), 500);
				} else {
					this.toastError(data.ret_det.message);

					this.cid = null;
				}
			} catch(e) {
				console.log(e);
			}
		},
		async deleteSignup(cid) {
			try {
				const {data} = await zabApi.delete(`/event/${this.$route.params.slug}/mandelete/${cid}`);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Sign-up successfully deleted');

					await this.getEventData();
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		async closeSignups() {
			try {
				const {data} = await zabApi.put(`/event/${this.$route.params.slug}/close`);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Sign-ups successfully closed');

					await this.getEventData();
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
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
		},
		getAssignment(cid) {
			if(this.event.positions) {
				const assignedPos = this.event.positions.filter(p => p.takenBy === cid);
				if(assignedPos.length) {
					return assignedPos[0].pos;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.no_signups {
	font-style: italic;
	padding: 0 1em 1em 1em;
	margin-top: -1em;
}

.signup_name {
	font-weight: 700;
	color: $primary-color-light;
}

.signup_rating {
	display: block;
	margin-top: -4px;
}

.signups_submit {
	padding: .5em 1.5em;

	button {
		margin: .25em;
	}
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
}

.options {
	i {
		cursor: pointer;
		user-select: none;
	}
}

.signups_list {
	td, th {
		&:not(.options) {
			min-width: 180px;
		}
	}
}

@media only screen and (max-width: 620px) {
	.signups_wrapper {
		overflow: auto;
	}
}

</style>