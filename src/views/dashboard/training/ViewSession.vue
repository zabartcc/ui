<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Training Session Details</span>
			<div class="loading_wrapper" v-if="session === null">
				<Spinner />
			</div>
			<div class="session_wrapper" v-else>
				<div class="row row_no_margin">
					<div class="col s12 l6">
						<div class="input-field">
							<input type="text" :value="session.student.fname + ' ' + session.student.lname" disabled id="student" />
							<label for="student" class="active">Student</label>
						</div>
						<div class="input-field">
							<input type="text" :value="session.instructor.fname + ' ' + session.instructor.lname" disabled id="ins" />
							<label for="ins" class="active">Instructor</label>
						</div>
						<div class="input-field">
							<input type="text" :value="dtLong(session.startTime)" disabled id="startTime" />
							<label for="startTime" class="active">Start Time</label>
						</div>
						<div class="input-field">
							<input type="text" :value="dtLong(session.endTime)" disabled id="endTime" />
							<label for="endTime" class="active">End Time</label>
						</div>
						<div class="input-field">
							<input type="text" :value="session.milestone.name" disabled id="milestone" />
							<label for="milestone" class="active">Milestone</label>
						</div>
						<div class="input-field">
							<input type="text" :value="session.position" disabled id="position" />
							<label for="position" class="active">Position</label>
						</div>
						<div class="input-field">
							<input type="number" :value="session.movements" disabled id="movements" />
							<label for="movements" class="active">Movements</label>
						</div>
						<div class="input-field">
							<input type="text" :value="formatLocation(session.location)" disabled id="location" />
							<label for="location" class="active">Location</label>
						</div>
						<div class="input-field">
							<span class="label">Progress</span>
							<div class="stars">
								<i class="material-icons">{{session.progress > 0 ? 'star' : 'star_border'}}</i>
								<i class="material-icons">{{session.progress > 1 ? 'star' : 'star_border'}}</i>
								<i class="material-icons">{{session.progress > 2 ? 'star' : 'star_border'}}</i>
								<i class="material-icons">{{session.progress > 3 ? 'star' : 'star_border'}}</i>
								<i class="material-icons">{{session.progress > 4 ? 'star' : 'star_border'}}</i>
							</div>
						</div>
					</div>
					<div class="col s12 l6">
						<div class="input-field">
							<textarea class="materialize-textarea" disabled id="studentNotes" v-model="session.studentNotes"></textarea>
							<label for="studentNotes" class="active">Student Notes</label>
						</div>
						<div class="input-field">
							<textarea class="materialize-textarea" disabled id="insNotes" v-model="session.insNotes"></textarea>
							<label for="insNotes" class="active">Instructor Notes</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';

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
			const {data} = await zabApi.get(`/training/session/${this.$route.params.id}`);
			this.session = data.data;
		},
		formatLocation(location) {
			const locations = ['Classroom', 'Live Network', 'Sweatbox'];
			return locations[location];
		}
	}
};
</script>

<style scoped lang="scss">
.label {
	color: #9e9e9e;
	font-size: .80rem;
    position: absolute;
    top: -1em;
    left: 0em;
    cursor: text;
}

.stars {
	i {
		color: $primary-color;
		cursor: pointer;
		user-select: none;
		font-size: 24px;
		margin-top: .33em;
	}
}
</style>