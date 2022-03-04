<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Training Session Details</span>
			<div class="loading_wrapper" v-if="!session">
				<Spinner />
			</div>
			<div class="session_wrapper" v-else>
				<div class="row row_no_margin">
					<div class="input-field col s12 m6">
						<input type="text" :value="session.student ? `${session.student.fname} ${session.student.lname}` : session.studentCid" disabled id="student" />
						<label for="student" class="active">Student</label>
					</div>
					<div class="input-field col s12 m6">
						<input type="text" :value="session.instructor ? `${session.instructor.fname} ${session.instructor.lname}` : session.instructorCid" disabled id="ins" />
						<label for="ins" class="active">Instructor</label>
					</div>
					<div class="input-field col s12 m6">
						<input type="text" :value="dtLong(session.startTime)" disabled id="startTime" />
						<label for="startTime" class="active">Start Time</label>
					</div>
					<div class="input-field col s12 m6">
						<input type="text" :value="dtLong(session.endTime)" disabled id="endTime" />
						<label for="endTime" class="active">End Time</label>
					</div>
					<div class="input-field col s12 m6">
						<input type="text" :value="session.milestone ? `${session.milestone.name} (${session.milestoneCode})` : 'General'" disabled id="milestone" />
						<label for="milestone" class="active">Milestone</label>
					</div>
					<div class="input-field col s12 m6">
						<input type="text" :value="session.position" disabled id="position" />
						<label for="position" class="active">Position</label>
					</div>
					<div class="input-field col s12 m4">
						<input type="text" :value="`${session.movements || 'Not Specified'}`" disabled id="movements" />
						<label for="movements" class="active">Movements</label>
					</div>
					<div class="input-field col s12 m4">
						<input type="text" :value="formatLocation(session.location)" disabled id="location" />
						<label for="location" class="active">Location</label>
					</div>
					<div class="input-field col s12 m4">
						<input type="text" :value="formatProgress(session.progress)" disabled id="progress" />
						<label for="progress" class="active">Progress</label>
					</div>
					<div class="input-field col s12">
						<textarea class="materialize-textarea" disabled id="studentNotes" :value="session.studentNotes || '–'"></textarea>
						<label for="studentNotes" class="active">Student Notes</label>
					</div>
					<div class="input-field col s12">
						<textarea class="materialize-textarea" disabled id="insNotes" :value="session.insNotes || '–'"></textarea>
						<label for="insNotes" class="active">Instructor Notes</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	name: 'ViewSession',
	title: 'Training Session Details',

	data() {
		return {
			session: null
		};
	},
	async mounted() {
		await this.getSessionDetails();
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.textareaAutoResize(document.getElementById('studentNotes'));
		M.textareaAutoResize(document.getElementById('insNotes'));
	},
	methods: {
		async getSessionDetails() {
			const { data } = await zabApi.get(`/training/session/${this.$route.params.id}`);
			this.session = data.data;
		},
		formatLocation(location) {
			const locations = ['Classroom', 'Live Network', 'Sweatbox'];
			return locations[location];
		},
		formatProgress(progress) {
			const options = ['No Progress', 'Little Progress', 'Average Progress', 'Great Progress', 'Exceptional Progress'];
			return options[progress - 1];
		}
	}
};
</script>

<style scoped lang="scss">
input:not(.browser-default):disabled, textarea.materialize-textarea:disabled {
	color: #333;
	-webkit-text-fill-color: #333;
	opacity: 1; /* required on iOS */
}
</style>