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
						<div class="input-field col s6">
							<input id="fname" type="text" v-model="user.data.fname" ref="fname" disabled required>
							<label for="fname" class="active">First Name</label>
						</div>
						<div class="input-field col s6">
							<input id="lname" type="text" :value="user.data.lname" ref="lname" disabled required>
							<label for="lname" class="active">Last Name</label>
						</div>
						<div class="input-field col s6">
							<input id="cid" type="text" :value="user.data.cid" ref="cid" disabled required>
							<label for="cid" class="active">Controller ID</label>
						</div>
						<div class="input-field col s6">
							<input id="rating" type="text" :value="user.data.ratingLong" ref="rating" disabled required>
							<label for="rating" class="active">Rating</label>
						</div>
						<div class="input-field col s6">
							<input id="email" type="email" :value="user.data.email" class="validate" ref="email" required>
							<label for="email">Email</label>
						</div>
						<div class="input-field col s6">
							<input id="home" type="text" :value="user.data.facility" class="validate" ref="home" required>
							<label for="home">Home ARTCC/FIR</label>
						</div>
						<div class="input-field col s12">
							<label for="reason">Why would you like to visit ZAB?</label>
							<textarea id="reason" class="materialize-textarea validate" ref="reason" required></textarea>
						</div>
						<div class="input-field col s12">
							<button type="submit" class="btn right" @click.prevent="submitApplication">Submit</button>
						</div>
					</div>
				</div>
				<div v-else>
					<p>You are already a home or visiting controller.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { ControllerMixin } from '@/mixins/ControllerMixin.js';

export default {
	data() {
		return {
		};
	},
	mixins: [ControllerMixin],
	methods: {
		async login() {
			localStorage.setItem('redirect', this.$route.path);
			window.location.href = `https://login.vatusa.net/uls/v2/login?fac=ZAB&url=${process.env.VUE_APP_ULS_LOGIN_REDIRECT_URL || 2}`;
		},
		async submitApplication() {
			if(!this.$refs.email.value || !this.$refs.home.value || !this.$refs.reason.value) {
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Please fill out all form fields.<div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});
				return false;
			}
			const data = {
				fname: this.$refs.fname.value,
				lname: this.$refs.lname.value,
				cid: this.$refs.cid.value,
				rating: this.$refs.rating.value,
				email: this.$refs.email.value,
				home: this.$refs.home.value,
				reason: this.$refs.reason.value
			};
			this.submitApplicationMixin(data).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Visitor application submitted! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$router.push('/');
			}).catch((err) => {
				console.log(err);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			});
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