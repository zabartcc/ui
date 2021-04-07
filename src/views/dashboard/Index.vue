<template>
	<div class="card home_intro">
		<div class="card-content">
			<span class="card-title">Controller Dashboard</span>
			<span class="section_title">IDS Token</span>
			<div class="hidden" id="token_wrap" @mouseleave="hideToken">
				<code>{{token}}</code>
				<span class="generate right" @click=generateToken><i class="material-icons">refresh</i></span>
				<div id="click_to_see" @click="showToken">Click to view</div>
			</div>
			<span class="section_title">Discord Status</span>
			<h6 class="discord_title" :class="`${discordConnected ? 'connect' : ''}`">{{discordConnected ? 'Connected!' : 'Not Connected.'}}</h6>
			<div class="discord_connect">
				<img :src="require(`@/assets/images/discord_${discordConnected ? 'color' : 'black'}.svg`)" alt="" draggable="false">
				<button v-if="!discordConnected" @click.prevent=linkDiscord class="btn">Link</button>
				<button v-else @click.prevent=unlinkDiscord class="btn">Unlink</button>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import {zabApi} from '@/helpers/axios.js';
export default {
	name: 'UserDash',
	title: 'Dashboard',
	data() {
		return {
			token: '',
			discordConnected: false
		};
	},
	computed: {
		...mapState('user', [
			'user'
		]),
	},
	async mounted() {
		this.token = this.user.data.idsToken || 'None Set';
		await this.getDiscordStatus();
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
		async getDiscordStatus() {
			const { data: discordData } = await zabApi.get('/user/discord');
			this.discordConnected = discordData.data;
		},
		showToken() {
			document.getElementById('token_wrap').classList.remove('hidden');
			document.getElementById('click_to_see').classList.add('hidden');
		},
		hideToken() {
			document.getElementById('token_wrap').classList.add('hidden');
			document.getElementById('click_to_see').classList.remove('hidden');
		},
		linkDiscord() {
			this.$router.push('/login/discord');
		},
		async unlinkDiscord() {
			const { data: unlinkData } = await zabApi.delete('/user/discord');
			if(unlinkData.ret_det.code === 200) {
				this.toastSuccess('Discord unlinked.');
				await this.getDiscordStatus();
			} else {
				this.toastError(unlinkData.ret_det.message);
			}
		},
		...mapActions('user', [
			'getUser'
		])
	}
};
</script>

<style scoped lang="scss">
#token_wrap {
	background: $gray_light;
	padding: 0.25em 0.5em 0.35em 0.5em;
	border-radius: 2px;
	height: 32px;
	width: 100%;
	max-width: 400px;
	position: relative;

	&.hidden {
		code, .generate {
			display: none;

			i {
				display: none;
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
}

.section_title {
	user-select: none;
	color: #9E9E9E;
	font-size: .9rem;
	display: inline-block;

	&~.section_title {
		margin-top: 2em;
	}
}

#click_to_see {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	text-align: center;
	cursor: pointer;
	user-select: none;
	display: flex;
	align-items: center;
	justify-content: center;

	&.hidden {
		display: none;
	}
}

.discord_title {
	font-size: 0.85rem;

	&.connect {
		color: $accent-color;
	}
}

.discord_connect {
	display: flex;
	align-items: center;
	img {
		max-width: 75px;
		margin-right: 1em;
	}
}
</style>