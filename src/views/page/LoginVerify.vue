<template>
    <div class="card home_intro">
		<div class="card-content">
			<h3>Processing Login, Please Wait</h3>
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import { mapMutations, mapActions } from 'vuex';
import route from '@/router/index.js';

export default {
	name: 'LoginVerify',
	methods: {
		...mapMutations('user', [
			'setToken'
		]),
		...mapActions('user', [
			'getUser'
		]),
	},
	async mounted () {
		const { data } = await zabApi.post('/user/login', {
			token: this.$route.query.token
		}).catch(err => {
			if (err.response.status === 401) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i>403: Not a member of ZAB<div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
				route.push('/');
			} else {
				console.log(err);
				M.toast({
					html: `<i class="material-icons left">error_outline</i>Something went wrong, please try again<div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			}
		});

		this.setToken(data);

		this.getUser().then(() => {

			this.$router.push(localStorage.getItem('redirect') || '/');

			M.Dropdown.init(document.querySelectorAll('.dropdown-right'), {
				alignment: 'right',
				coverTrigger: false,
				constrainWidth: false
			});
		});
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