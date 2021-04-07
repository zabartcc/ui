<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Become a Visitor</span>
			<div v-if="!user.isLoggedIn">
				<p>Thank you for your interest in visiting the Albuquerque ARTCC. To apply for visiting status, please click the button below to login and continue.</p><br />
				<p><b class="red-text">Important: </b>please ensure that you are allowed to visit per <a href="https://www.vatsim.net/documents/transfer-and-visiting-controller-policy" target="_blank"><b>VATSIM's Transfer and Visiting Controller Policy</b></a>. Any application that doesn't meet the requirements as outlined in that policy will be rejected with or without notice.</p>
				<button class="btn btn-waves login_button" @click="login">Login with SSO</button>
			</div>
			<div v-else>
				<div v-if="!user.data.isMem">
					<div class="row" v-if="user.data">
						<div class="input-field col s12 m6">
							<input id="fname" type="text" v-model="user.data.fname" ref="fname" disabled required>
							<label for="fname" class="active">First Name</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="lname" type="text" :value="user.data.lname" ref="lname" disabled required>
							<label for="lname" class="active">Last Name</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="cid" type="text" :value="user.data.cid" ref="cid" disabled required>
							<label for="cid" class="active">Controller ID</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="rating" type="text" :value="user.data.ratingLong" ref="rating" disabled required>
							<label for="rating" class="active">Rating</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="email" type="email" :value="user.data.email" class="validate" ref="email" required>
							<label for="email" class="active">Email</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="home" type="text" :value="user.data.facility" class="validate" ref="home" required>
							<label for="home">Home ARTCC/FIR</label>
						</div>
						<div class="input-field col s12">
							<label for="reason">Why would you like to visit ZAB?</label>
							<textarea id="reason" class="materialize-textarea validate" ref="reason" required></textarea>
						</div>
						<div class="input-field col s12">
							<button type="submit" class="btn right" @click.prevent="submitApplication" ref="submitButton">Submit</button>
						</div>
					</div>
				</div>
				<div v-else>
					<p>You already are a home or visiting controller.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'VisitorApply',
	title: 'Become A Visitor',
	data() {
		return {
		};
	},
	methods: {
		async login() {
			localStorage.setItem('redirect', this.$route.path);
			window.location.href = `https://login.vatusa.net/uls/v2/login?fac=ZAB&url=${process.env.VUE_APP_ULS_LOGIN_REDIRECT_URL || 1}`;
		},
		async submitApplication() {
			try {
				this.$refs.submitButton.classList.add('disabled');
				const {data} = await zabApi.post('/controller/visit', {
					fname: this.$refs.fname.value,
					lname: this.$refs.lname.value,
					cid: this.$refs.cid.value,
					rating: this.$refs.rating.value,
					email: this.$refs.email.value,
					home: this.$refs.home.value,
					reason: this.$refs.reason.value
				});

				if(data.ret_det.code === 200) {
					this.toastSuccess('Visitor application successfully submitted');
					this.$router.push('/');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
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
.login_button {
	margin: 1em auto;
	display: block;
	width: 200px;
}
</style>