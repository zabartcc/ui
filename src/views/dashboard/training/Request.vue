<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Training Request</span>
			<div class="loading_container" v-if="!milestones">
				<Spinner />
			</div>
			<div class="request_wrapper row row_no_margin" v-else>
				<div class="col s12 l6 push-l6">
					<p><b class="red-text">Important: </b> training requests are just that—requests. <br /><br />
					There is no guarantee that your session will be picked up by a member of the training staff. If a request you've made gets picked up, you are expected to show up.
					Treat the times as your availability, mentors and instructors have the ability to modify these times when they pick up the session. <br /><br />
					Please also make sure that you've read through the required material, as per the Training Syllabus, before requesting a session.</p>
				</div>
				<div class="col s12 l6 pull-l6">
					<form class="row row_no_margin" @submit.prevent=submitRequest>
						<div class="input-field col s12">
							<input id="start_time" type="datetime-local" v-model="request.startTime" required>
							<label for="start_time" class="active">Start Time (Zulu) <span class="red-text">*</span></label>
						</div>
						<div class="input-field col s12">
							<input id="end_time" type="datetime-local" v-model="request.endTime" required>
							<label for="end_time" class="active">End Time (Zulu) <span class="red-text">*</span></label>
						</div>
						<div class="input-field col s12">
							<select v-model="request.milestone" required>
								<option value="" disabled selected>Select a milestone</option>
								<option v-for="milestone in milestones" :key="milestone._id" :value="milestone._id">{{milestone.code + ' - ' + milestone.name}}</option>
								
							</select>
							<label>Milestone <span class="red-text">*</span></label>
						</div>
						<div class="input-field col s12">
							<textarea id="remarks" class="materialize-textarea" data-length="500" v-model="request.remarks"></textarea>
							<label for="remarks" class="active">Remarks</label>
						</div>
						<div class="submit_request">
							<input type="submit" class="btn" value="submit" />
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'RequestTraining',
	title: 'Request Training',
	data() {
		return {
			request: {
				startTime: '',
				endTime: '',
				milestone: '',
				remarks: '',
				submitter: this.$store.state.user.user.data._id
			},
			milestones: null
		};
	},
	components: {
		Spinner
	},
	async mounted() {
		await this.getTrainingMilestones();
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
	},
	methods: {
		async submitRequest() {
			try {
				const {data} = await zabApi.post('/training/request/new', this.request);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Training Request successfully submitted');
					this.$router.push('/dash/training');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		async getTrainingMilestones() {
			const {data} = await zabApi.get(`/training/milestones`);
			this.milestones = data.data.milestones;
		}
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