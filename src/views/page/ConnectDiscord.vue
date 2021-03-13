<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Linking Discord...</span>
			<div>
				<Spinner/>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';
import { mapState } from 'vuex';
export default {
	name: 'ConnectDiscord',
	title: 'Linking Discord...',
	components: {
		Spinner
	},
	async mounted() {
		const {data} = await zabApi.post('/user/discord', {
			cid: this.user.data.cid,
			code: this.$route.query.code
		});
		if(data.ret_det.code === 200) {
			M.toast({
				html: '<i class="material-icons left">done</i> Discord account linked! <div class="border"></div>',
				displayLength: 5000,
				classes: 'toast toast_success',
			});
		} else {
			M.toast({
				html: `<i class="material-icons left">error_outline</i>${data.ret_det.message}<div class="border"></div>`,
				displayLength: 5000,
				classes: 'toast toast_error'
			});
		}
		if(this.user.data.isMem) {
			this.$router.push('/dash');
		} else {
			this.$router.push('/');
		}
	},
	computed: {
		...mapState('user', [
			'user'
		])
	}
};
</script>

<style lang="scss" scoped>
	.success_message h4 {
		color: $accent-color;
	}
</style>