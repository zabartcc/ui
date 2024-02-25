<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Training Request</span>
			<div class="loading_container" v-if="!milestones">
				<Spinner />
			</div>
			<div class="request_wrapper row row_no_margin" v-else>
				<div class="col s12 l6 push-l6">
					<p><b class="red-text">Important: </b> training requests are just that — requests. <br /><br />
					There is no guarantee that your session will be picked up by a member of the training staff. If a request you've made gets picked up, you are expected to show up.
					Treat the times as your availability, mentors and instructors have the ability to modify them when they pick up the session. <br /><br />
					Please make sure that you've studied the relevant training material, as per the Training Syllabus, before requesting a session.</p>
				</div>
				<div class="col s12 l6 pull-l6">
					<form class="row row_no_margin" @submit.prevent="submitRequest">
						<div class="input-field col s12">
							<input id="start_date" type="text" ref="start_date" required>
							<label for="start_date">Start Time (Zulu)<span class="red-text">*</span></label>
						</div>
						<div class="input-field col s12">
							<input id="end_date" type="text" ref="end_date" required>
							<label for="end_date">End Time (Zulu)<span class="red-text">*</span></label>
						</div>
						<div class="input-field col s12">
							<select v-model="request.milestone" class="materialize-select">
								<option value="" disabled selected>Select a milestone</option>
								<option v-for="milestone in filteredMilestones" :key="milestone._id" :value="milestone.code">{{milestone.code + ' - ' + milestone.name}}</option>
								
							</select>
							<label>Milestone <span class="red-text">*</span></label>
						</div>
						<div class="input-field col s12">
							<textarea id="remarks" class="materialize-textarea" data-length="500" v-model="request.remarks"></textarea>
							<label for="remarks" class="active">Remarks</label>
						</div>
						<div class="submit_request">
							<input type="submit" class="btn" value="Request" :disabled="makingRequest" />
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import { mapState } from 'vuex';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default {
	name: 'RequestTraining',
	title: 'Request Training',
	data() {
		return {
			request: {
				milestone: '',
				remarks: '',
				submitter: ''
			},
			milestones: null,
			makingRequest: false
		};
	},
	async mounted() {
		await this.getTrainingMilestones();
		const today = new Date(new Date().toUTCString());

		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});

		this.request.submitter = this.user.data._id;

		flatpickr(this.$refs.start_date, {
			enableTime: true,
			time_24hr: true,
			minDate: today,
			disableMobile: true,
			minuteIncrement: 15,
			dateFormat: 'Y-m-dTH:i:00.000\\Z',
			altFormat: 'Y-m-d H:i',
			altInput: true,
		});

		flatpickr(this.$refs.end_date, {
			enableTime: true,
			time_24hr: true,
			minDate: today,
			disableMobile: true,
			minuteIncrement: 15,
			dateFormat: 'Y-m-dTH:i:00.000\\Z',
			altFormat: 'Y-m-d H:i',
			altInput: true,
		});
	},
	methods: {
		async submitRequest() {
			try {
				if(!this.request.milestone) this.toastError('You must select a milestone');
				else {
					this.makingRequest = true;
					const { data } = await zabApi.post('/training/request/new', {
						...this.request,
						startTime: `${this.$refs.start_date.value}`,
						endTime: `${this.$refs.end_date.value}`
					});

					if(data.ret_det.code === 200) {
						this.toastSuccess('Training session requested');
						this.$router.push('/dash/training');
						this.makingRequest = false;
					} else {
						this.toastError(data.ret_det.message);
						this.makingRequest = false;
					}
				}
			} catch(e) {
				console.log(e);
			}
		},
		async getTrainingMilestones() {
			const { data } = await zabApi.get(`/training/milestones`);
			this.milestones = data.data.milestones;
		}
	},
	computed: {
		filteredMilestones() {
			const userCerts = this.user.data.certCodes;
			const rating = this.user.data.rating;

			if(this.milestones) {
				const minorPrerequisites = ["obs"];
				const majorPrerequisites = ["obs", "kabq", "kphxground", "kphxtower", "p50"];

				let milestonesShowed = this.milestones.filter((milestone) => {
					const milestoneAvailableAtRating = milestone.availableAtRatings.includes(rating); // Milestones available for rating.
					let userHasTierOneForCurrentRating = false;

					// See if the user has a tier one cert for their current rating.
					if (rating == 2) {
						userHasTierOneForCurrentRating = userCerts.includes('kphxground');
					} else if (rating == 3) {
						userHasTierOneForCurrentRating = userCerts.includes('kphxtower');
					}
					else if (rating == 4) {
						userHasTierOneForCurrentRating = userCerts.includes('p50');
					}

					// Return milestones available to user (hide tier one if they have the cert already).
					return milestoneAvailableAtRating && !(milestone.hiddenWhenControllerHasTierOne && userHasTierOneForCurrentRating)
				});

				return milestonesShowed;
			}
		},
		...mapState('user', [
			'user'
		])
	}

};
</script>

<style scoped lang="scss">
.request_wrapper {
	padding-top: 1em;

	.col {
		margin-bottom: 1em;
	}
}

.submit_request {
	margin-left: .75em;
}
</style>