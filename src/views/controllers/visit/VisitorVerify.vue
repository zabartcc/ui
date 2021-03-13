<template>
    <div class="card home_intro">
		<div class="card-content">
			<h5>Processing Login, Please Wait</h5>
			<Spinner />
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import {mapActions} from 'vuex';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'LoginVerify',
	methods: {
		...mapActions('visit', [
			'getVisit'
		]),
	},
	components: {
		Spinner
	},
	async mounted() {
		try {
			await zabApi.post('/user/visit/login', {
				token: this.$route.query.token
			});
			await this.getVisit();
			this.$router.push('/controllers/visit');

			M.Dropdown.init(document.querySelectorAll('.dropdown-right'), {
				alignment: 'right',
				coverTrigger: false,
				constrainWidth: false
			});
		} catch(e) {
			console.log(e);
		}
	},
};
</script>

<style scoped>
.card-content {
	text-align: center;
}
</style>