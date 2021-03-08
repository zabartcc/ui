<template>
	<div class="card home_intro">
		<div class="card-content">
			<span class="card-title">Controller Dashboard</span>
			<h6>IDS Token:</h6>
			<p class="token_wrap">
				<code>{{token}}</code>
			</p>
			<button class="btn waves-effect btn-small" @click.prevent=generateToken>Generate New</button>
			<p>
			</p>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import {zabApi} from '@/helpers/axios.js';
export default {
	data() {
		return {
			token: '',
		};
	},
	computed: {
		...mapState('user', [
			'user'
		])
	},
	mounted() {
		this.token = this.user.data.idsToken || 'None Set';
	},
	methods: {
		generateToken: async function() {
			const { data: tokenRet } = await zabApi.post('/user/idsToken');
			if(tokenRet.ret_det.code !== 200) {
				this.toastError('Something went wrong, please try again.');
			} else {
				this.toastSuccess('Token successfully generated!');
				this.token = tokenRet.data;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.token_wrap {
	padding-bottom: 0.75em;
}
code {
	padding: 0.25em 0.5em;
	background: $gray_light;
}
</style>