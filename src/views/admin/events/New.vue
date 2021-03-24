<template>
	<div class="card" v-if=form>
		<div class="card-content">
			<span class="card-title">New Event</span>
			<div class="row">
				<form method="post" enctype="multipart/form-data" @submit.prevent=submitForm>
					<div class="input-field col s12">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name">Name</label>
					</div>
					<div class="input-field col s12 m3">
						<input id="start_date" type="text" class="datepicker" ref="start_date" required>
						<label for="start_date">Start Date (Zulu)</label>
					</div>
					<div class="input-field col s12 m3">
						<input id="start_time" type="text" class="timepicker" ref="start_time" required>
						<label for="start_time">Start Time (Zulu)</label>
					</div>
					<div class="input-field col s12 m3">
						<input id="end_date" type="text" class="datepicker" ref="end_date" required>
						<label for="end_date">End Date (Zulu)</label>
					</div>
					<div class="input-field col s12 m3">
						<input id="end_time" type="text" class="timepicker" ref="end_time" required>
						<label for="end_time">End Time (Zulu)</label>
					</div>
					<div class="file-field input-field col s12">
						<div class="btn">
							<span>FILE</span>
							<input type="file" ref="banner" required>
						</div>
						<div class="file-path-wrapper">
							<input class="file-path validate" type="text" placeholder="Banner (.jpg .png or .gif, less than 6 MB)">
						</div>
					</div>
					<div class="input-field col s12">
						<textarea id="description" class="materialize-textarea" v-model="form.description"></textarea>
						<label for="description">Description</label>
					</div>
					<div class="input-field col s12">
						<input type="submit" class="btn right" value="submit" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'NewEvent',
	title: 'New Event',
	data() {
		return {
			form: {
				name: '',
				eventStart: {
					date: '',
					time: ''
				},
				eventEnd: {
					date: '',
					time: ''
				},
				description: '',
				positions: []
			}
		};
	},
	mounted() {
		M.Datepicker.init(document.querySelectorAll('.datepicker'), {
			format: 'yyyy-mm-dd',
			showDaysInNextAndPreviousMonths: true,
		});
		M.Timepicker.init(document.querySelectorAll('.timepicker'), {
			twelveHour: false,
		});
	},
	methods: {
		deletePos(pos) {
			const i = this.form.positions.findIndex(obj => obj.pos === pos);
			this.form.positions = [...this.form.positions.slice(0, i), ...this.form.positions.slice(i + 1)];
		},
		async submitForm() {
			// console.log(this.$refs);
			const formData = new FormData();
			formData.append('banner', this.$refs.banner.files[0]);
			formData.append('name', this.form.name);
			formData.append('startTime', `${this.$refs.start_date.value}T${this.$refs.start_time.value}:00.000Z`);
			formData.append('endTime', `${this.$refs.end_date.value}T${this.$refs.end_time.value}:00.000Z`);
			formData.append('description', this.form.description);
			// formData.append('positions', JSON.stringify(this.form.positions));
			// formData.append('createdBy', this.$store.state.user.user.data._id);

			const {data: eventCreate} = await zabApi.post('/event', formData, {
				headers: { 
					'Content-Type': 'multipart/form-data'
				}
			});

			if(eventCreate.ret_det.code != 200) {
				this.toastError(eventCreate.ret_det.message);
			} else {
				this.toastSuccess('Event successfully created!');
				this.$router.push('/admin/events');
			}
		}
	},
	computed: {
		centerPos() {
			return this.form.positions.filter((pos) => pos.type == "CTR");
		},
		traconPos() {
			return this.form.positions.filter((pos) => pos.type == "APP");
		},
		localPos() {
			return this.form.positions.filter((pos) => pos.type == "TWR" || pos.type == "GND" || pos.type == "DEL");
		}
	}
};
</script>

<style scoped lang="scss">
.card_positions {
	padding: 0;

	.positions_title {
		font-weight: 600;
		padding: 1em;
	}

	form {
		padding: 1em;
	}

	.positions_input {
		width: calc(100% - 2em);
		margin-right: 1em;
	}

	.positions_submit {
		border: none;
		background-color: transparent;
		color: $primary-color;
		text-align: right;
		cursor: pointer;
		width: 2em;
		float: right;
		margin-top: -30px;
	}

	.collection-item {
		border: 0;
		padding-left: .5em;

		.material-icons {
			float: right;
		}
	}

	.pos_header {
		padding: .5em;
	}

	.collection-item:nth-of-type(odd) {
		background-color: $gray-mild;
	}

	.no_pos {
		margin-left: 1em;
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