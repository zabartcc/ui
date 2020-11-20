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
export default {
	name: 'LoginVerify',
	methods: {
		...mapMutations('visit', [
			'setVisitToken'
		]),
		...mapActions('visit', [
			'getVisit'
		]),
	},
	async mounted () {
		const { data } = await zabApi.post('/user/visit/login', {
			token: this.$route.query.token
		}).catch(err => {
			console.log(err);
		});

		this.setVisitToken(data);

		this.getVisit().then(() => {

			this.$router.push('/controllers/visit');

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