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
		}).catch(err => {
			if (err.response.status === 403) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i>Not a member of ZAB<div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
				this.$router.push('/');
			} else {
				console.log(err);
				M.toast({
					html: `<i class="material-icons left">error_outline</i>Something went wrong, please try again<div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			}
		});
		if(data) {
			this.getUser();
			window.location.href = (localStorage.getItem('redirect') || '/');
		}
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