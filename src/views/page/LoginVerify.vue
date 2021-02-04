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
		});
		if(data.ret_det.code === 200) {
			this.getUser();
		} else if(data.ret_det.code === 403) {
			M.toast({
				html: `<i class="material-icons left">error_outline</i>Not a member of ZAB.<div class="border"></div>`,
				displayLength: 5000,
				classes: 'toast toast_error'
			});
		} else {
			M.toast({
				html: `<i class="material-icons left">error_outline</i>Something went wrong, please try again.<div class="border"></div>`,
				displayLength: 5000,
				classes: 'toast toast_error'
			});
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