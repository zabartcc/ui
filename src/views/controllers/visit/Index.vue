<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Become a Visitor</span>
			<div v-if="visit.isLoggedIn == false">
				<p>Thank you for your interest in visiting the Albuquerque ARTCC. To apply for visiting status, please click the button below to login and continue.</p>
				<button class="btn btn-waves login_button" @click="login">Login with SSO</button>
			</div>
			<div v-else>
				<div class="row" v-if="visit.data">
					<div class="input-field col s6">
						<input id="fname" type="text" v-model="visit.data.fname" ref="fname" disabled required>
						<label for="fname" class="active">First Name</label>
					</div>
					<div class="input-field col s6">
						<input id="lname" type="text" :value="visit.data.lname" ref="lname" disabled required>
						<label for="lname" class="active">Last Name</label>
					</div>
					<div class="input-field col s6">
						<input id="cid" type="text" :value="visit.data.cid" ref="cid" disabled required>
						<label for="cid" class="active">Controller ID</label>
					</div>
					<div class="input-field col s6">
						<input id="rating" type="text" :value="visit.data.rating" ref="rating" disabled required>
						<label for="rating" class="active">Rating</label>
					</div>
					<div class="input-field col s6">
						<input id="email" type="email" :value="visit.data.email" ref="email" required>
						<label for="email" class="active">Email</label>
					</div>
					<div class="input-field col s6">
						<input id="home" type="text" :value="visit.data.facility" ref="home" required>
						<label for="home" class="active">Home ARTCC/FIR</label>
					</div>
					<div class="input-field col s12">
						<label for="reason" class="active">Why would you like to visit ZAB?</label>
						<textarea id="reason" class="materialize-textarea" ref="reason" required></textarea>
					</div>
					<div class="input-field col s12">
						<button type="submit" class="btn right" @click="submitApplication">Submit</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { ControllerMixin } from '@/mixins/ControllerMixin.js';
import router from '@/router/index.js';

export default {
	data() {
		return {
		};
	},
	mixins: [ControllerMixin],
	methods: {
		...mapActions('visit', [
			'getVisit'
		]),
		async login() {
			window.location.href = 'https://login.vatusa.net/uls/v2/login?fac=ZAB&url=3';
		},
		async submitApplication() {
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
				localStorage.removeItem('visit_token');
				router.push('/');
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
	async mounted() {
		this.getVisit();
	},
	computed: {
		...mapState('visit', [
			'visit'
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