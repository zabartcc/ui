<template>
    <div class="card home_intro">
		<div class="card-content">
			<span class="processing_login">Processing Login, Please Wait</span>
			<div class="loading_container">
				<Spinner />
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import {mapMutations, mapActions} from 'vuex';

export default {
	name: 'LoginVerify',
	title: 'Verifying Login...',
	methods: {
		...mapMutations('user', [
			'setLoggedIn'
		]),
		...mapActions('user', [
			'getUser'
		]),
	},
	async mounted () {
		const {data} = await zabApi.post('/user/login', {
			token: this.$route.query.token
		});
		if(data.ret_det.code === 200) {
			this.getUser();
		} else {
			this.toastError('Something went wrong, please try again');
		}
		this.$router.push(localStorage.getItem('redirect') || '/');
	},
};
</script>

<style scoped>
.card-content {
	text-align: center;
}

.processing_login {
	font-weight: 600;
	font-size: 2rem;
}

.progress {
	max-width: 500px;
	margin: 50px auto;
}
</style>