<template>
	<div class="card home_intro">
		<div class="card-content">
			<span class="card-title">Controller Dashboard</span>
			<div class="ids">
				<span class="title">IDS Token</span>
				<div class="hidden" id="token_wrap" @mouseleave="hideToken">
					<code>{{token}}</code>
					<span class="generate right" @click=generateToken><i class="material-icons">refresh</i></span>
				</div>
				<div id="click_to_see" @click="showToken">Click to view</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex';
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
	async mounted() {
		this.token = this.user.data.idsToken || 'None Set';
	},
	methods: {
		async generateToken() {
			const { data: tokenRet } = await zabApi.post('/user/idsToken');
			if(tokenRet.ret_det.code === 200) {
				this.toastSuccess('Token successfully generated');
				this.token = tokenRet.data;
			} else {
				this.toastError(tokenRet.ret_det.message);
			}
		},
		showToken() {
			document.getElementById('token_wrap').classList.remove('hidden');
			document.getElementById('click_to_see').classList.add('hidden');
		},
		hideToken() {
			document.getElementById('token_wrap').classList.add('hidden');
			document.getElementById('click_to_see').classList.remove('hidden');
		}
	}
};
</script>

<style scoped lang="scss">

.ids {
	width: 100%;
	max-width: 400px;

	#token_wrap {
		background: $gray_light;
		padding: 0.25em 0.5em 0.35em 0.5em;
		border-radius: 2px;
		height: 32px;

		&.hidden {
			code, .generate {
				display: none;

				i {
					display: none;
				}
			}
		}
	}
	code {
		display: inline-block;
		border-radius: 0;
		padding-top: .1em;
		white-space: nowrap;
		overflow: auto;
		width: 90%;
	}

	.generate {
		border-radius: 0;
		width: 10%;
		text-align: right;

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
		color: #9E9E9E;
		font-size: .9rem;
	}

	#click_to_see {
		margin-top: -1.85em;
		padding-bottom: .40em;
		text-align: center;
		cursor: pointer;
		user-select: none;

		&.hidden {
			display: none;
		}
	}
}
</style>