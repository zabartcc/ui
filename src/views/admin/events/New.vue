<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Event</span>
			<div class="row">
				<div class="input-field col s12">
					<input id="name" type="text" ref="name">
					<label for="name">Name</label>
				</div>
				<div class="input-field col s6">
					<input id="start_time" type="datetime-local" ref="start_time">
					<label for="start_time" class="active">Start Time (Zulu)</label>
				</div>
				<div class="input-field col s6">
					<input id="end_time" type="datetime-local" ref="end_time">
					<label for="end_time" class="active">End Time (Zulu)</label>
				</div>
				<div class="file-field input-field col s12">
					<div class="btn">
						<span>FILE</span>
						<input type="file">
					</div>
					<div class="file-path-wrapper">
						<input class="file-path validate" type="text" placeholder="Banner (.jpg .png or .gif)">
					</div>
				</div>
				<div class="input-field col s12">
					<textarea id="description" class="materialize-textarea" ref="description"></textarea>
					<label for="description">Description</label>
				</div>
				<div class="input-field col s12">
					<div class="row">
						<div class="col s12 l4">
							<div class="card card_positions">
								<p class="positions_title">Center</p>
								<p class="no_pos" v-if="form.positions.center.length == 0">No positions defined yet.</p>
								<ul class="collapsible collapse-ctr expandable" v-else>
									<li v-for="position in form.positions.center" class="collection-item" :key="position.name">
										<div class="collapsible-header">{{position.name}} <i class="material-icons">keyboard_arrow_down</i></div>
										<div class="collapsible-body">
											YOLO!
										</div>
									</li>
								</ul>
								<form @submit.prevent=addPosition>
									<input type="hidden" value="CTR" name="type" />
									<input type="text" class="positions_input" placeholder="ABQ_CTR" name="pos" />
									<button class="positions_submit" type="submit" name="action">
										<i class="material-icons">add</i>
									</button>
								</form>
							</div>
						</div>
						<div class="col s12 l4">
							<div class="card card_positions">
								<p class="positions_title">TRACON</p>
								<p class="no_pos" v-if="form.positions.tracon.length == 0">No positions defined yet.</p>
								<ul v-else>
									<li v-for="position in form.positions.tracon" class="collection-item" :key="position.name">
										{{position.name}}
										<span class="right"><i class="material-icons">keyboard_arrow_down</i></span>
									</li>
								</ul>
								<form @submit.prevent=addPosition>
									<input type="hidden" value="APP" name="type" />
									<input type="text" class="positions_input" placeholder="PHX_APP" name="pos" />
									<button class="positions_submit" type="submit" name="action">
										<i class="material-icons">add</i>
									</button>
								</form>
							</div>
						</div>
						<div class="col s12 l4">
							<div class="card card_positions">
								<p class="positions_title">Local</p>
								<p class="no_pos" v-if="form.positions.local.length == 0">No positions defined yet.</p>
								<ul v-else>
									<li v-for="position in form.positions.local" class="collection-item" :key="position.name">
										{{position.name}}
										<span class="right"><i class="material-icons">keyboard_arrow_down</i></span>
									</li>
								</ul>
								<form @submit.prevent=addPosition>
									<input type="hidden" value="TWR" name="type" />
									<input type="text" class="positions_input" placeholder="TUS_TWR" name="pos" />
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
			</div>
		</div>
	</div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';
export default {
	data() {
		return {
			form: {
				name: '',
				startTime: '',
				endTime: '',
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
					"name": e.target.elements.pos.value,
					"type": e.target.elements.pos.value.slice(-3),
					"major": true,
					"minRating": 5
				};
				this.form.positions.center.push(obj);
				e.target.reset(); // clear input
			} else if(e.target.elements.type.value == 'APP') {
				//
			} else {
				//
			}
		},
	},
	mounted() {

	}
};
</script>

<style scoped lang="scss">
.input_oi input {
	width: 85%;
}

.side_oi {
	margin-top: 20px;
	width: 15%;
	text-align: center;
}

.cert {
	display: inline-block;
	padding: 0.25rem 0.4rem;
	font-size: 0.85rem;
	margin: 2px;
	cursor: pointer;
	transition: background-color .3s ease;

	&.cert_null {
		background: $gray_mild;
		color: #9e9e9e;
	}

	&.cert_senior {
		background: $cert_senior!important;
		color: #fff!important;
	}

	&.cert_junior {
		background: $cert_junior!important;
		color: #fff!important;
	}

	&.cert_training {
		background: $cert_training!important;
		color: #fff!important;
	}
	
	&.cert_center {
		background-color: $secondary-color-dark!important;
		color: #fff!important;
	}

	&.cert_major {
		background: $secondary-color!important;
		color: #fff!important;
	}

	&.cert_minor {
		background: $secondary-color-light!important;
		color: #fff!important;
	}
}

#certs_container, #roles_container {
	margin-top: 5px;
}

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
		padding: .5em;
		border: 0;

		.material-icons {
			float: right!important;
		}
	}
	.collapsible {
		border: none;
		margin: 0;
		box-shadow: none;
	}

	.collapsible-header {
		background-color: transparent;
		padding: 0;
		border: 0;

		i {
			position: absolute;
			right: 0;
		}

	}

	.collection-item:nth-of-type(odd) {
		background-color: $gray-mild!important;
	}

	.no_pos {
		padding: .5em;
	}
}
</style>