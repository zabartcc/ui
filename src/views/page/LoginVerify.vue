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
import axios from '@/helpers/axios';
import { mapMutations, mapActions } from 'vuex';
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
		const { data } = await axios.post('/user/login', {
			token: this.$route.query.token
		}).catch(err => {
			console.log(err);
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