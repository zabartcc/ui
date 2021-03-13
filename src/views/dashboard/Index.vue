<template>
	<div class="card home_intro">
		<div class="card-content">
			<span class="card-title">Controller Dashboard</span>
			<div class="ids">
				<span class="title">IDS Token: </span>
				<span class="token_wrap">
					<code>{{token}}</code>
					<span class="generate" @click=generateToken><i class="material-icons">refresh</i></span>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import {zabApi} from '@/helpers/axios.js';
export default {
	name: 'UserDash',
	title: 'Dashboard',
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
			if(tokenRet.ret_det.code === 200) {
				this.toastSuccess('Token successfully generated');
				this.token = tokenRet.data;
			} else {
				this.toastError(`${tokenRet.ret_det.message}`);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.ids {
	.token_wrap {
		padding-bottom: 0.75em;
		background: $gray_light;
		padding: 0.25em 0.5em 0.35em 0.5em;
		border-radius: 5px;
		margin-left: .5em;
	}
	code {
		display: inline-block;
		border-radius: 0;
		width: 300px;
	}

	.generate {
		border-radius: 0;
		i {
			font-size: 18px;
			margin-left: .25em;
			margin-top: .20em;
			vertical-align: top;
			user-select: none;
			cursor: pointer;
		}
	}

	.title {
		user-select: none;
	}
}
</style>