<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Become a Visitor</span>
			<div v-if="!user.isLoggedIn">
				<p>Thank you for your interest in visiting the Albuquerque ARTCC. To apply for visiting status, click the button below to login and continue.</p><br />
				<p><b class="red-text">Important: </b>please ensure that you are allowed to visit per <a href="https://www.vatsim.net/documents/transfer-and-visiting-controller-policy" target="_blank"><b>VATSIM's Transfer and Visiting Controller Policy</b></a>. Any application that doesn't meet the requirements as outlined in that policy will be rejected.</p>
				<button class="btn btn-waves login_button" @click="login">Login with VATSIM</button>
			</div>
			<div v-else-if="pendingApplication">
				<p>
					We have received your visiting application successfully! Our staff team will review your application as soon as possible. In the meantime, if you have any questions or concerns, please don't hesitate to <a class="mailto_link" href="mailto:datm@zabartcc.org">let the DATM know.</a>
				</p>
			</div>
			<div v-else>
				<div v-if="!user.data.isMem">
					<div class="row row_no_margin" v-if="user.data">
						<div class="input-field col s12 m6">
							<input id="fname" type="text" :value="user.data.fname" disabled required>
							<label for="fname" class="active">First Name</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="lname" type="text" :value="user.data.lname" disabled required>
							<label for="lname" class="active">Last Name</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="cid" type="text" :value="user.data.cid" disabled required>
							<label for="cid" class="active">Controller ID</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="rating" type="text" :value="user.data.ratingLong" disabled required>
							<label for="rating" class="active">Rating</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="email" type="email" :value="user.data.email" ref="email" class="validate" required>
							<label for="email" class="active">Email</label>
						</div>
						<div class="input-field col s12 m6">
							<input id="home" type="text" v-model="form.facility" class="validate" required>
							<label for="home">Home ARTCC/FIR</label>
						</div>
						<div class="input-field col s12">
							<label for="reason">Why would you like to visit ZAB?</label>
							<textarea id="reason" class="materialize-textarea validate" v-model="form.reason" required></textarea>
						</div>
						<div class="input-field col s12">
							<button type="submit" class="btn right" @click.prevent="submitApplication" ref="submitButton">Submit</button>
						</div>
					</div>
				</div>
				<div v-else>
					<p>You already are a member of ZAB</p>
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
			pendingApplication: false,
			form: {
				facility: null,
				reason: null
			}
		};
	},
	async mounted() {
		await this.checkOpenApplications();
	},
	methods: {
		async login() {
			localStorage.setItem('redirect', this.$route.path);
			window.location.href = `https://login.vatusa.net/uls/v2/login?fac=ZAB&url=${process.env.VUE_APP_ULS_LOGIN_REDIRECT_URL || 1}`;
		},
		async checkOpenApplications() {
			try {
				const {data: statusData} = await zabApi.get('/controller/visit/status');
				this.pendingApplication = !!statusData.data;
			} catch(e) {
				console.log(e);
			}
		},
		async submitApplication() {
			try {
				this.$refs.submitButton.classList.add('disabled');
				const {data} = await zabApi.post('/controller/visit', {
					...this.form,
					email: this.$refs.email.value
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

.mailto_link {
	font-weight: 600;
}
</style>