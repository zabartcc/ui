<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Event</span>
			<div class="loading_container" v-if="form === null">
				<Spinner />
			</div>
			<div class="row row_no_margin" v-else>
				<form enctype="multipart/form-data" @submit.prevent="submitForm">
					<div class="input-field col s12">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name" class="active">Name</label>
					</div>
					<div class="input-field col s12 m6">
						<input id="startDate" type="text" class="datepicker" ref="start_date" required>
						<label for="startDate" class="active">Start Time (Zulu)</label>
					</div>
					<div class="input-field col s12 m6">
						<input id="endDate" type="text" class="datepicker" ref="end_date" required>
						<label for="endDate" class="active">End Time (Zulu)</label>
					</div>
					<div class="file-field input-field col s12">
						<div class="btn waves-effect waves-light">
							<span>FILE</span>
							<input type="file" ref="banner">
						</div>
						<div class="file-path-wrapper">
							<input class="file-path validate" type="text" :value="form.bannerUrl">
						</div>
					</div>
					<div class="input-field col s12">
						<textarea id="description" class="materialize-textarea" v-model="form.description"></textarea>
						<label for="description" class="active">Description</label>
					</div>
					<div class="input-field col s12">
						<div class="row row_no_margin">
							<div class="col s12 l6 push-l3">
								<div class="card card_positions z-depth-2">
									<p class="positions_title">Event Positions</p>
									<p class="no_pos" v-if="form.positions && form.positions.length === 0">No positions added yet</p>
									<ul v-else>
										<li v-for="position in form.positions" class="collection-item" :key="position">
											<div class="pos_header">{{position}} <span class="delete_pos" @click="deletePos(position)">Delete</span></div>
										</li>
									</ul>
									<form @submit.prevent="addPosition">
										<input type="text" class="positions_input" placeholder="ABQ_CTR" name="pos" ref="pos" required />
										<button class="positions_submit" type="submit" name="action">
											<i class="material-icons">add</i>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div class="input-field col s12">
						<input type="submit" class="btn waves-effect waves-light right" value="Update" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { DateTime } from 'luxon';

export default {
	data() {
		return {
			form: null
		};
	},
	async mounted() {
		await this.getEvent();
		this.setTitle(`Edit ${this.form.name}`);
		M.textareaAutoResize(document.getElementById('description'));
	},
	methods: {
		async getEvent() {
			const { data } = await zabApi.get(`/event/${this.$route.params.slug}`);
			this.form = data.data;
			if(this.form.positions && this.form.positions.length != 0) { this.form.positions = this.form.positions.map(p => p.pos); }
			else { this.form.positions = []; }

			this.$nextTick(() => {
				// Okay, so working with timezones with JS is hard. This is really gross and I hate it, but it works so 🤷‍♀️
				const startTime =  DateTime.fromISO(this.form.eventStart);
				const endTime =  DateTime.fromISO(this.form.eventEnd);
				
				flatpickr(this.$refs.start_date, {
					enableTime: true,
					time_24hr: true,
					defaultDate: startTime.plus({minutes: -startTime.offset}).toISO(),
					disableMobile: true,
					minuteIncrement: 15,
					dateFormat: 'Y-m-dTH:i:00.000\\Z',
					altFormat: 'Y-m-d H:i',
					altInput: true,
				});

				flatpickr(this.$refs.end_date, {
					enableTime: true,
					time_24hr: true,
					defaultDate: endTime.plus({minutes: -endTime.offset}).toISO(),
					disableMobile: true,
					minuteIncrement: 15,
					dateFormat: 'Y-m-dTH:i:00.000\\Z',
					altFormat: 'Y-m-d H:i',
					altInput: true,
				});
			});
		},
		async submitForm() {
			try {
				const formData = new FormData();
				formData.append('name', this.form.name);
				formData.append('startTime', `${this.$refs.start_date.value}`);
				formData.append('endTime', `${this.$refs.end_date.value}`);
				formData.append('description', this.form.description);
				formData.append('positions', JSON.stringify(this.form.positions));
				formData.append('banner', this.$refs.banner.files[0]);

				const {data} = await zabApi.put(`/event/${this.$route.params.slug}`, formData, {
					headers: { 
						'Content-Type': 'multipart/form-data'
					}
				});

				if(data.ret_det.code === 200) {
					this.toastSuccess('Event updated');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		async addPosition(e) {
			if(this.form.positions && (!this.form.positions.includes(this.$refs.pos.value.toUpperCase()) || this.form.positions.length === 0)) {
				this.form.positions.push(this.$refs.pos.value.toUpperCase());
			} else {
				this.toastError('Position already exists');
			}
			e.target.reset();
		},
		deletePos(pos) {
			this.form.positions = this.form.positions.filter(p => p != pos);
		}
	},
};
</script>

<style scoped lang="scss">
.card_positions {
	padding: 0;

	.positions_title {
		font-weight: 600;
		padding: .5em 1em;
	}

	form {
		padding: .5em 1em;
	}

	.positions_input {
		width: calc(100% - 40px);
		margin-right: 10px;
	}

	.positions_submit {
		border: none;
		background-color: transparent;
		color: $primary-color;
		text-align: right;
		cursor: pointer;
		width: 40px;
		float: right;
		margin-top: -30px;
	}

	.collection-item {
		border: 0;

		.material-icons {
			float: right;
		}
	}

	.pos_header {
		padding: .5em 1em;
	}

	.collection-item:nth-of-type(odd) {
		background-color: $gray-mild;
	}

	.no_pos {
		padding: .5em 1em;
		font-style: italic;
	}

	
	.delete_pos {
		color: #9e9e9e;
		font-size: .8rem;
		cursor: pointer;
		text-decoration: underline;
		margin-right: .5rem;
		float: right;
	}
}
</style>