<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Training Request</span>
			<div class="loading_container" v-if="!milestones">
				<Spinner />
			</div>
			<div class="request_wrapper row" v-else>
				<div class="col s12 l6 push-l6">
					<p><b class="red-text">Important: </b> training requests are just that—requests. <br /><br />
					There is no guarantee that your session will be picked up by a member of the training staff. If a request you've made gets picked up, you are expected to show up.
					Treat the times as your availability, mentors and instructors have the ability to modify these times when they pick up the session. <br /><br />
					Please also make sure that you've read through the required material, as per the Training Syllabus, before requesting a session.</p>
				</div>
				<div class="col s12 l6 pull-l6">
					<div class="row row_no_margin">
						<div class="input-field col s12">
							<input id="start_time" type="datetime-local" v-model="request.startTime" required>
							<label for="start_time" class="active">Start Time (Zulu)</label>
						</div>
						<div class="input-field col s12">
							<input id="end_time" type="datetime-local" v-model="request.endTime" required>
							<label for="end_time" class="active">End Time (Zulu)</label>
						</div>
						<div class="input-field col s12">
							<select v-model="request.milestone" required>
								<option value="" disabled selected>Select a milestone</option>
								<option v-for="milestone in milestones" :key="milestone._id" :value="milestone._id">{{milestone.code + ' - ' + milestone.name}}</option>
								
							</select>
							<label>Milestone</label>
						</div>
					</div>
				</div>
				<div class="submit_request">
					<input type="submit" class="btn right" value="submit" @click="submitRequest" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {TrainingMixin} from '@/mixins/TrainingMixin.js';
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'PastSessions',
	data() {
		return {
			request: {
				startTime: '',
				endTime: '',
				milestone: '',
				submitter: this.$store.state.user.user.data._id
			},
			milestones: null
		};
	},
	components: {
		Spinner
	},
	mixins: [TrainingMixin],
	async mounted() {
		await this.getTrainingMilestones();
		M.FormSelect.init(document.querySelectorAll('select'), {});
	},
	methods: {
		async submitRequest() {
			try {
				await zabApi.post('/training/new', this.request);
				M.toast({
					html: '<i class="material-icons left">done</i> Training request submitted <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$router.push('/dash/training');
			} catch(e) {
				console.log(e);
				M.toast({
					html: `<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			}
		},
		async getTrainingMilestones() {
			const response = await this.getTrainingMilestonesMixin(this.request.submitter);
			console.log(response);
			this.milestones = response.milestones;
		}
	}

};
</script>

<style scoped lang="scss">
.request_wrapper {
	padding-top: 1em;
}

.submit_request {
	margin-right: 1em;
}
</style>