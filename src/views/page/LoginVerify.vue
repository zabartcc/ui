<template>
    <div class="card home_intro">
		<div class="card-content">
			<h5>Processing Login, Please Wait</h5>
			<Spinner width="300px" />
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import { mapMutations, mapActions } from 'vuex';
import Spinner from '@/components/Spinner.vue';

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
	components: {
		Spinner
	},
	async mounted () {
		const {data} = await zabApi.post('/user/login', {
			token: this.$route.query.token
		});
		if(data.ret_det.code === 200) {
			this.getUser();
			this.toastSuccess('Successfully logged in.');
		} else {
			this.toastError('Something went wrong, please try again.');
		}
		this.$router.push(localStorage.getItem('redirect') || '/');
	},
};
</script>

<style scoped>
.card-content {
	text-align: center;
}

.progress {
	max-width: 500px;
	margin: 50px auto;
}
</style>