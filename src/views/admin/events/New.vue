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
					<div class="input-field col s6">
						<input id="start_time" type="datetime-local" v-model="form.eventStart" required>
						<label for="start_time" class="active">Start Time (Zulu)</label>
					</div>
					<div class="input-field col s6">
						<input id="end_time" type="datetime-local" v-model="form.eventEnd" required>
						<label for="end_time" class="active">End Time (Zulu)</label>
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
						<div class="row">
							<div class="col s12 l4">
								<div class="card card_positions">
									<p class="positions_title">Center</p>
									<p class="no_pos" v-if="centerPos.length == 0">No positions added yet.</p>
									<ul v-else>
										<li v-for="position in centerPos" class="collection-item" :key="position.pos">
											<div class="pos_header">{{position.pos}} <span class="delete_pos" @click="deletePos(position.pos)">Delete</span></div>
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
									<p class="no_pos" v-if="traconPos.length == 0">No positions added yet.</p>
									<ul v-else>
										<li v-for="position in traconPos" class="collection-item" :key="position.pos">
											<div class="pos_header">{{position.pos}} <span class="delete_pos" @click="deletePos(position.pos)">Delete</span></div>
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
									<p class="no_pos" v-if="localPos.length == 0">No positions added yet.</p>
									<ul v-else>
										<li v-for="position in localPos" class="collection-item" :key="position.pos">
											<div class="pos_header">{{position.pos}} <span class="delete_pos" @click="deletePos(position.pos)">Delete</span></div>
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
import { mapState } from 'vuex';
import { zabApi } from '@/helpers/axios.js';

export default {
	data() {
		return {
			form: {
				name: '',
				eventStart: '',
				eventEnd: '',
				description: '',
				positions: []
			}
		};
	},
	methods: {
		async addPosition(e) {
			if(e.target.elements.type.value == 'CTR') {
				const obj = {
					"pos": e.target.elements.pos.value.toUpperCase(),
					"type": e.target.elements.type.value,
					"code": "zab"
				};
				this.form.positions.push(obj);
				e.target.reset(); // clear input
			} else if(e.target.elements.type.value == 'APP') {
				let code = "app";
				if(e.target.elements.pos.value.slice(0,3) == 'PHX') {
					code = "p50app";
				}
				const obj = {
					"pos": e.target.elements.pos.value.toUpperCase(),
					"type": e.target.elements.type.value,
					"code": code
				};
				this.form.positions.push(obj);
				e.target.reset(); // clear input
			} else {
				let code = "";
				const input = e.target.elements.pos.value.slice(0,3) + e.target.elements.pos.value.slice(-3);
				if(input == "PHXTWR") { code = "p50twr"; }
				else if(input == "PHXGND") { code = "p50gnd"; }
				else if(input == "PHXDEL") { code = "p50gnd"; }
				else if(input.slice(-3) == "TWR") { code = "twr"; }
				else if(input.slice(-3) == "GND") { code = "gnd"; }
				else if(input.slice(-3) == "DEL") { code = "gnd"; }
				
				const obj = {
					"pos": e.target.elements.pos.value.toUpperCase(),
					"type": e.target.elements.pos.value.slice(-3).toUpperCase(),
					"code": code
				};
				this.form.positions.push(obj);
				e.target.reset(); // clear input
			}
		},
		deletePos(pos) {
			const i = this.form.positions.findIndex(obj => obj.pos === pos);
			this.form.positions = [...this.form.positions.slice(0, i), ...this.form.positions.slice(i + 1)];
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

			zabApi.post(`/event/new`, formData, {
				headers: { 
					'Content-Type': 'multipart/form-data'
				}
			}).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Event succesfully created! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$router.push('/admin/events');
			}).catch((err) => {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${err.response.data} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			});
		}
	},
	computed: {
		...mapState('user', [
			'user'
		]),
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

	.pos_header {
		padding: .5em;
	}

	.collection-item:nth-of-type(odd) {
		background-color: $gray-mild;
	}

	.no_pos {
		padding: .5em;
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