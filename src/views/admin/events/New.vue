<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Event</span>
			<div class="row">
				<form method="post" enctype="multipart/form-data" @submit.prevent=submitForm>
					<div class="input-field col s12">
						<input id="name" type="text" v-model="form.name">
						<label for="name">Name</label>
					</div>
					<div class="input-field col s6">
						<input id="start_time" type="datetime-local" v-model="form.eventStart">
						<label for="start_time" class="active">Start Time (Zulu)</label>
					</div>
					<div class="input-field col s6">
						<input id="end_time" type="datetime-local" v-model="form.eventEnd">
						<label for="end_time" class="active">End Time (Zulu)</label>
					</div>
					<div class="file-field input-field col s12">
						<div class="btn">
							<span>FILE</span>
							<input type="file" ref="banner">
						</div>
						<div class="file-path-wrapper">
							<input class="file-path validate" type="text" placeholder="Banner (.jpg .png or .gif)">
						</div>
					</div>
					<div class="input-field col s12">
						<textarea id="description" class="materialize-textarea" v-model="form.description"></textarea>
						<label for="description">Description</label>
					</div>
					<div class="input-field col s12">
						<div class="row">
							<div class="col s12 l4">
								<div class="card card_positions">
									<p class="positions_title">Center</p>
									<p class="no_pos" v-if="form.positions.center.length == 0">No positions added yet.</p>
									<ul v-else>
										<li v-for="(position, i) in form.positions.center" class="collection-item" :key="position.pos">
											<div class="collapsible_header" @click="expand(i, 'ctr')">{{position.pos}} <i class="material-icons" :id="`chevron-ctr-${i}`">keyboard_arrow_down</i></div>
											<div class="collapsible_body hidden" :id="`collapsible-ctr-${i}`">
												<div class="input-field">
													<label for="rating">Rating</label>
													<select class="browser-default select_rating" v-model="form.positions.center[i].minRating" id="rating">
														<option value=5>Controller 1</option>
														<option value=4>Student 3</option>
														<option value=3>Student 2</option>
														<option value=2>Student 1</option>
													</select>
												</div>
												<div class="input-field">
													<label for="major">Major</label>
													<select class="browser-default select_major" v-model="form.positions.center[i].major" id="major">
														<option value=true>Yes</option>
														<option value=false>No</option>
													</select>
												</div>
												<span class="delete_pos" @click="deletePos(i, 'center')">Delete</span>
											</div>
										</li>
									</ul>
									<form @submit.prevent=addPosition>
										<input type="hidden" value="CTR" name="type" />
										<input type="text" class="positions_input" placeholder="ABQ_CTR" name="pos" required />
										<button class="positions_submit" type="submit" name="action">
											<i class="material-icons">add</i>
										</button>
									</form>
								</div>
							</div>
							<div class="col s12 l4">
								<div class="card card_positions">
									<p class="positions_title">TRACON</p>
									<p class="no_pos" v-if="form.positions.tracon.length == 0">No positions added yet.</p>
									<ul v-else>
										<li v-for="(position, i) in form.positions.tracon" class="collection-item" :key="position.pos">
											<div class="collapsible_header" @click="expand(i, 'tracon')">{{position.pos}} <i class="material-icons" :id="`chevron-tracon-${i}`">keyboard_arrow_down</i></div>
											<div class="collapsible_body hidden" :id="`collapsible-tracon-${i}`">
												<div class="input-field">
													<label for="rating">Rating</label>
													<select class="browser-default select_rating" v-model="form.positions.tracon[i].minRating" id="rating">
														<option value=5>Controller 1</option>
														<option value=4>Student 3</option>
														<option value=3>Student 2</option>
														<option value=2>Student 1</option>
													</select>
												</div>
												<div class="input-field">
													<label for="major">Major</label>
													<select class="browser-default select_major" v-model="form.positions.tracon[i].major" id="major">
														<option value=true>Yes</option>
														<option value=false>No</option>
													</select>
												</div>
												<span class="delete_pos" @click="deletePos(i, 'tracon')">Delete</span>
											</div>
										</li>
									</ul>
									<form @submit.prevent=addPosition>
										<input type="hidden" value="APP" name="type" />
										<input type="text" class="positions_input" placeholder="PHX_APP" name="pos" required />
										<button class="positions_submit" type="submit" name="action">
											<i class="material-icons">add</i>
										</button>
									</form>
								</div>
							</div>
							<div class="col s12 l4">
								<div class="card card_positions">
									<p class="positions_title">Local</p>
									<p class="no_pos" v-if="form.positions.local.length == 0">No positions added yet.</p>
									<ul v-else>
										<li v-for="(position, i) in form.positions.local" class="collection-item" :key="position.pos">
											<div class="collapsible_header" @click="expand(i, 'local')">{{position.pos}} <i class="material-icons" :id="`chevron-local-${i}`">keyboard_arrow_down</i></div>
											<div class="collapsible_body hidden" :id="`collapsible-local-${i}`">
												<div class="input-field">
													<label for="rating">Rating</label>
													<select class="browser-default select_rating" v-model="form.positions.local[i].minRating" id="rating">
														<option value=5>Controller 1</option>
														<option value=4>Student 3</option>
														<option value=3>Student 2</option>
														<option value=2>Student 1</option>
													</select>
												</div>
												<div class="input-field">
													<label for="major">Major</label>
													<select class="browser-default select_major" v-model="form.positions.local[i].major" id="major">
														<option value=true>Yes</option>
														<option value=false>No</option>
													</select>
												</div>
												<span class="delete_pos" @click="deletePos(i, 'local')">Delete</span>
											</div>
										</li>
									</ul>
									<form @submit.prevent=addPosition>
										<input type="hidden" value="TWR" name="type" />
										<input type="text" class="positions_input" placeholder="TUS_TWR" name="pos" required />
										<button class="positions_submit" type="submit" name="action">
											<i class="material-icons">add</i>
										</button>
									</form>
								</div>
							</div>
						</div>
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
import { EventsMixin } from '@/mixins/EventsMixin.js';
import { mapState } from 'vuex';
import axios from '@/helpers/axios.js';
import router from '@/router/index.js';

export default {
	data() {
		return {
			form: {
				name: '',
				eventStart: '',
				eventEnd: '',
				description: '',
				positions: {
					center: [
					],
					tracon: [
					],
					local: [
					]
				}
			}
		};
	},
	mixins: [EventsMixin],
	methods: {
		async addPosition(e) {
			if(e.target.elements.type.value == 'CTR') {
				const obj = {
					"pos": e.target.elements.pos.value,
					"type": e.target.elements.type.value,
					"major": true,
					"minRating": 5
				};
				this.form.positions.center.push(obj);
				e.target.reset(); // clear input
			} else if(e.target.elements.type.value == 'APP') {
				let major = false;
				if(e.target.elements.pos.value.slice(0,3) == 'PHX') {
					major = true;
				}
				const obj = {
					"pos": e.target.elements.pos.value,
					"type": e.target.elements.type.value,
					"major": major,
					"minRating": 4
				};
				this.form.positions.tracon.push(obj);
				e.target.reset(); // clear input
			} else {
				let major = false;
				let rating = 2;
				if(e.target.elements.pos.value.slice(0,3) == 'PHX') {
					major = true;
				}
				if(e.target.elements.pos.value.slice(-3) == 'TWR') {
					rating = 3;
				}
				const obj = {
					"pos": e.target.elements.pos.value,
					"type": e.target.elements.pos.value.slice(-3),
					"major": major,
					"minRating": rating
				};
				this.form.positions.local.push(obj);
				e.target.reset(); // clear input
			}
		},
		expand(i, name) {
			const drop = document.getElementById(`collapsible-${name}-${i}`);
			drop.classList.toggle("hidden");
			const chev = document.getElementById(`chevron-${name}-${i}`);
			chev.classList.toggle("rotate_180");
		},
		deletePos(i, type) {
			if(type == 'center') {
				this.form.positions.center.splice(i, 1);
			} else if(type == 'tracon') {
				this.form.positions.tracon.splice(i, 1);
			} else {
				this.form.positions.local.splice(i, 1);
			}
		},
		async submitForm() {
			const formData = new FormData();
			formData.append('name', this.form.name);
			formData.append('startTime', this.form.eventStart);
			formData.append('endTime', this.form.eventEnd);
			formData.append('description', this.form.description);
			formData.append('positions', JSON.stringify(this.form.positions));
			formData.append('banner', this.$refs.banner.files[0]);
			formData.append('createdBy', this.user.data._id);
			const userToken = localStorage.getItem('token') || null;

			axios.post(`/event/new`, formData, {
				headers: { 
					Authorization: `Bearer ${userToken}`,
					'Content-Type': 'multipart/form-data'
				}
			}).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Event succesfully created! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				router.push('/admin/events');
			}).catch((err) => {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${err.response.data} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			});
		}
	},
	mounted() {

	},
	computed: {
		...mapState('user', [
			'user'
		]),
	}
};
</script>

<style scoped lang="scss">
.card_positions {
	padding: 0;

	.positions_title {
		font-weight: 600;
		padding: .5em;
	}

	form {
		padding: .5em;
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
	.collapsible {
		border: none;
		margin: 0;
		box-shadow: none;
	}

	.collapsible_header {
		background-color: transparent;
		padding: .5em;
		border: 0;
		cursor: pointer;

		i {
			position: absolute;
			right: 0;
			transition: transform .1s linear;
		}

		.rotate_180 {
			transform: rotate(180deg);
		}

	}

	.collection-item:nth-of-type(odd) {
		background-color: $gray-mild;
	}

	.no_pos {
		padding: .5em;
	}

	.hidden {
		max-height: 0!important;
		overflow: hidden;
		transition: max-height .3s linear;
		border: 0!important;
	}

	.collapsible_body {
		background-color: #fff;
		border-bottom: 1px solid $gray_light;
		max-height: 500px;
		transition: max-height .3s linear;

		.input-field {
			margin-top: 0;
			margin-left: .5em;

			select {
				width: calc(100% - .5em);
			}

			label {
				position: relative;
				font-size: .8em;
				left: 0;
			}
		}
		.select_rating, .select_major {
			padding: .5em;
			height: auto;
		}

		.select_major {
			margin-bottom: 30px;
		}

		.delete_pos {
			color: #9e9e9e;
			font-size: .8rem;
			cursor: pointer;
			text-decoration: underline;
			margin-right: .5rem;
			float: right;
			margin-top: -20px;
		}
	}
}
</style>