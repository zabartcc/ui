<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Submit Feedback</span>
			<div class="card_desc">
				<p>
				We welcome your feedback! Please use the form below to send feedback about one of our controllers. Please note that your identitity will always be shared with the ATM, DATM, and TA, regardless of selecting the anonymous option.
				</p>
			</div>
			<form class="row row_no_margin" id="feedback" @submit.prevent=submitFeedback>
				<div class="input-field col s6">
					<input id="first_name" type="text" class="validate" v-model="feedback.name" required>
					<label for="first_name">Your Name</label>
				</div>
				<div class="input-field col s6">
					<input id="email" type="email" class="validate" v-model="feedback.email" required>
					<label for="email">Your Email Address</label>
				</div>
				<div class="input-field col s6">
					<input id="cid" type="text" minlength=6 maxlength=7 class="validate" v-model="feedback.cid" required>
					<label for="cid">Your CID</label>
				</div>
				<div class="input-field col s6">
					<select v-model="feedback.controller" required>
						<option value="" disabled selected>Select a controller</option>
						<option v-for="controller in controllers" :value="controller._id" :key="controller._id">{{controller.fname}} {{controller.lname}}</option>
					</select>
					<label>Controller</label>
				</div>
				<div class="input-field col s6">
					<select v-model="feedback.position" required>
						<option value="" disabled selected>Select a position</option>
						<option value="center">Center</option>
						<option value="approach">Approach</option>
						<option value="tower">Tower</option>
						<option value="ground">Ground</option>
						<option value="delivery">Delivery</option>
					</select>
					<label>Position</label>
				</div>
				<div class="input-field col s6">
					<select v-model="feedback.rating" required>
						<option value="" disabled selected>Select a rating</option>
						<option value="5">Excellent</option>
						<option value="4">Above Average</option>
						<option value="3">Average</option>
						<option value="2">Below Average</option>
						<option value="1">Poor</option>
					</select>
					<label>Rating</label>
				</div>
				<div class="input-field col s12">
					<textarea id="comments" class="materialize-textarea" data-length="5000" v-model="feedback.comments"></textarea>
					<label for="comments">Comments</label>
				</div>
				<div class="checkbox col s12">
					<label class="form_checkbox">
						<input type="checkbox" :value="true" v-model="feedback.anon" />
						<span>Remain anonymous</span>
					</label>
				</div>
				<div class="input-field col s12">
					<input type="submit" class="btn right" value="Submit" />
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import { FeedbackMixin } from '@/mixins/FeedbackMixin.js';

export default {
	data() {
		return {
			feedback: {
				name: '',
				email: '',
				cid: null,
				controller: null,
				rating: null,
				position: null,
				comments: '',
				anon: false
			},
			controllers: []
		};
	},
	mixins: [FeedbackMixin],
	async mounted() {
		await this.getControllers();
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
	},
	methods: {
		async getControllers() {
			this.controllers = await this.getControllersMixin();
		},
		async submitFeedback() {
			zabApi.post('/feedback', this.feedback).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Feedback successfully submitted! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.feedback = {};
				document.getElementById("feedback").reset();
				M.textareaAutoResize(document.querySelectorAll('textarea'));
			}).catch((err) => {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${err.response.data} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			});
		}
	}
};
</script>

<style scoped lang="scss">
	.card_desc {
		margin-bottom: 1em;
	}

	.row_no_margin {
		margin-bottom: 0;
	}

	.form_checkbox {
		span {
			color: black;
		}
	}

	.checkbox {
		padding-left: 1em;
	}
	
	input.valid[type=email]:not(.browser-default) {
		border-bottom: 1px solid $primary-color;
		box-shadow: 0 1px 0 0 $primary-color;
	}
</style>