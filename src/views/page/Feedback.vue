<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Submit Feedback</span>
			<div class="loading_container" v-if="!controllers">
				<Spinner />
			</div>
			<div v-else>
				<div class="card_desc">
					<p>
						We welcome your feedback! Please use the form below to send feedback about one of our controllers. Please note that your identity will always be shared with the ATM, DATM, and TA, regardless of selecting the 'remain anonymous' option.
					</p>
				</div>
				<div v-if="!user.isLoggedIn">
					<p>To prevent abuse of the feedback system, we require all users to log in via VATSIM SSO before submitting feedback. The only details shared with ZAB are your name, CID and email. Your password is never revealed to us.</p><br />
					<div class="center-align">
						<button class="btn btn-waves login_button" @click="login">Login with VATSIM SSO</button>
					</div>
				</div>
				<form class="row row_no_margin" id="feedback" @submit.prevent=submitFeedback v-else>
					<div class="input-field col s12 m6">
						<input id="name" type="text" class="validate" v-model="feedback.name" required disabled>
						<label class="active" for="name">Your Name</label>
					</div>
					<div class="input-field col s12 m6">
						<input id="email" type="email" class="validate" v-model="feedback.email" required disabled>
						<label class="active" for="email">Your Email Address</label>
					</div>
					<div class="input-field col s12 m6">
						<input id="cid" type="text" minlength=6 maxlength=7 class="validate" v-model="feedback.cid" required disabled>
						<label class="active" for="cid">Your CID</label>
					</div>
					<div class="input-field col s12 m6">
						<select v-model="feedback.controller" required>
							<option value="" disabled selected>Select a controller</option>
							<option v-for="controller in controllers" :value="controller.cid" :key="controller.cid">{{controller.fname}} {{controller.lname}}</option>
						</select>
						<label>Controller</label>
					</div>
					<div class="input-field col s12 m6">
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
					<div class="input-field col s12 m6">
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
	</div>
</template>

<script>
import {mapState} from 'vuex';
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'Feedback',
	title: 'Leave Feedback',
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
			controllers: null
		};
	},
	async mounted() {
		await this.getControllers();
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
		if(this.user) {
			this.feedback.name = `${this.user.data.fname} ${this.user.data.lname}`;
			this.feedback.email = this.user.data.email;
			this.feedback.cid = this.user.data.cid;
		}
	},
	methods: {
		async login() {
			localStorage.setItem('redirect', this.$route.path);
			window.location.href = `https://login.vatusa.net/uls/v2/login?fac=ZAB&url=1`;
		},
		async getControllers() {
			const {data} = await zabApi.get('/feedback/controllers');
			this.controllers = data.data;
		},
		async submitFeedback() {
			const {data} = await zabApi.post('/feedback', this.feedback);
			if(data.ret_det.code === 200) {
				this.toastSuccess('Feedback successfully submitted');

				document.getElementById("feedback").reset();

				this.feedback = {
					name: `${this.user.data.fname} ${this.user.data.lname}`,
					email: this.user.data.email,
					cid: this.user.data.cid,
				};
				this.$nextTick(() => {
					M.textareaAutoResize(document.querySelector('textarea'));
					M.updateTextFields();
				});
			} else {
				this.toastError(data.ret_det.message);
			}
		}
	},
	computed: {
		...mapState('user', [
			'user'
		])
	}
};
</script>

<style scoped lang="scss">
.card_desc {
	margin-bottom: 1em;
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