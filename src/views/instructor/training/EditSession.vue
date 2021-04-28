<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">
				Enter Session Notes
			</span>
			<div class="loading_container" v-if="session === null">
				<Spinner />
			</div>
			<div class="session_notes" v-else>
				<div class="stepper">
					<div :class="`step active`">
						<span v-html='step === 1 ? "1" : `<i class="material-icons" style="margin-left: -6px">check</i>`'></span>
					</div>
					<div class="stepper_divider"></div>
					<div :class="`step ${step > 1 ? 'active' : ''}`">
						<span v-html='step < 3 ? "2" : `<i class="material-icons" style="margin-left: -6px">check</i>`'></span>
					</div>
					<div class="stepper_divider"></div>
					<div :class="`step ${step > 2 ? 'active' : ''}`">3</div>
				</div>
				<form @submit.prevent=submitForm>
					<div class="row row_no_margin" v-show="step === 1">
						<div class="input-field col s12 m6">
							<input id="student" type="text" :value="session.student.fname + ' ' + session.student.lname" required disabled>
							<label for="student" class="active">Student Name</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="instructor" type="text" :value="session.instructor.fname + ' ' + session.instructor.lname" required disabled>
							<label for="instructor" class="active">Instructor Name</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="startTime" type="text" :value="dtLong(session.startTime)" required disabled>
							<label for="startTime" class="active">Start Time</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="endTime" type="text" :value="dtLong(session.endTime)" required disabled>
							<label for="endTime" class="active">End Time</label>
						</div>
						<div class="input-field col s12 m6 milestone">
							<select required disabled class="materialize-select">
								<option disabled selected>{{session.milestone.name}}</option>
							</select>
							<label>Milestone</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="position" type="text" required v-model="session.position">
							<label for="position" class="active">Position</label>
						</div>
					</div>
					<div class="row row_no_margin" v-show="step === 2">
						<div class="input-field col s12 m6">
							<input id="movements" type="number" min="0" max="500" required v-model="session.movements">
							<label for="movements" class="active">Movements</label>
						</div>
						<div class="input-field col s12 m6">
							<select required v-model="session.location" class="materialize-select">
								<option value="" disabled selected>Select a location</option>
								<option value=0>Classroom</option>
								<option value=1>Live Network</option>
								<option value=2>Sweatbox</option>
							</select>
							<label>Location</label>
						</div>
						<div class="input-field col s12 m6">
							<select required v-model="session.progress" class="materialize-select">
								<option value="" disabled selected>Select an option</option>
								<option value=1>No Progress</option>
								<option value=2>Little Progress</option>
								<option value=3>Average Progress</option>
								<option value=4>Great Progress</option>
								<option value=5>Exceptional Progress</option>
							</select>
							<label>Progress</label>
						</div>
						<div class="input-field col s12 m6">
							<select required v-model="session.ots" class="materialize-select">
								<option value="" disabled selected>Select an option</option>
								<option value=0>No OTS</option>
								<option value=1>OTS Pass</option>
								<option value=2>OTS Fail</option>
								<option value=3>Recommend OTS</option>
							</select>
							<label>OTS</label>
						</div>
					</div>
					<div class="row row_no_margin" v-show="step === 3">
						<div class="input-field col s12">
							<textarea id="studentNotes" class="materialize-textarea" data-length="3000" v-model="session.studentNotes"></textarea>
							<label for="studentNotes" class="active">Student Notes <i class="material-icons tooltipped" data-position="right" data-tooltip="Notes visible to the student">help</i></label>
						</div>
						<div class="input-field col s12">
							<textarea id="insNotes" class="materialize-textarea" data-length="3000" v-model="session.insNotes"></textarea>
							<label for="insNotes" class="active">Instructor Notes <i class="material-icons tooltipped" data-position="right" data-tooltip="Notes visible to training staff only">help</i></label>
						</div>
					</div>
					<div class="row row_no_margin">
						<div class="input-field col s12 submit_buttons">
							<input type="submit" v-if="step === 3" class="btn right" value="Finalize" />
							<input type="submit" v-if="step === 3" class="btn-flat right" value="Save" @click="saveForm" />
							<button type="button" class="btn right" v-if="step !== 3" @click="step += 1">Next</button>
							<button type="button" v-if="step !== 1" @click="step -= 1" class="btn-flat right">Back</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
export default {
	name: 'EditSessionNotes',
	title: 'Enter Session Notes',
	data() {
		return {
			session: null,
			step: 1
		};
	},
	async mounted() {
		await this.getSessionDetails();
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
	},
	methods: {
		async getSessionDetails() {
			try {
				const {data} = await zabApi.get(`/training/session/${this.$route.params.id}`);
				this.session = data.data;
			} catch(e) {
				console.log(e);
			}
		},
		async saveForm() {
			try {
				const {data} = await zabApi.put(`/training/session/save/${this.$route.params.id}`, {
					position: this.session.position,
					movements: this.session.movements,
					progress: this.session.progress,
					ots: this.session.progress,
					location: this.session.location,
					startTime: this.session.startTime,
					endTime: this.session.endTime,
					studentNotes: this.session.studentNotes,
					insNotes: this.session.insNotes
				});
				if(data.ret_det.code === 200) {
					this.toastSuccess('Session notes saved');
					this.$router.push('/ins/training/sessions');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		async submitForm() {
			try {
				const {data} = await zabApi.put(`/training/session/submit/${this.$route.params.id}`, this.session);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Session notes finalized');
					this.$router.push('/ins/training/sessions');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		}
	}
};
</script>

<style scoped lang="scss">
label {
	.material-icons {
		font-size: 17px;
		display: inline-flex;
		vertical-align: top;
		margin-top: .25em;
		user-select: none;
		cursor: pointer;
	}
}

.submit_buttons {
	input {
		margin-left: .5em;
	}
}

.stepper {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 1em 0;

	.step {
		background: lightgray;
		font-weight: 600;
		text-shadow: 1px 1px gray;
		color: #fff;
		height: 2.5em;
		width: 2.5em;
		padding: .45em .92em;
		border-radius: 50%;
		transition: .3s ease;

		&.active {
			background: $primary-color-light;
			text-shadow: 1px 1px $primary-color;
		}
	}

	.stepper_divider {
		flex-grow: 1;
		height: 1px;
		margin-left: 1em;
		margin-right: 1em;
		margin-top: 1.25em;
		background: lightgray;
	}
}
</style>