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
import { mapActions } from 'vuex';
export default {
	name: 'LoginVerify',
	methods: {
		...mapActions('visit', [
			'getVisit'
		]),
	},
	async mounted () {
		zabApi.post('/user/visit/login', {
			token: this.$route.query.token
		}).then(() => {
			this.getVisit().then(() => {

				this.$router.push('/controllers/visit');

				M.Dropdown.init(document.querySelectorAll('.dropdown-right'), {
					alignment: 'right',
					coverTrigger: false,
					constrainWidth: false
				});
			});
		}).catch(err => {
			console.log(err);
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