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
			<span class="section_title">External Integrations</span>
			<div class="discord_connect">
				<button v-if="!discordConnected" class="btn waves-effect waves-light" @click.prevent=linkDiscord>
					<img :src="require(`@/assets/images/discord.svg`)" alt="" draggable="false" class="discord_logo" height="24">
					Link Discord
				</button>
				<button v-else class="btn waves-effect grey lighten-1" @click.prevent=unlinkDiscord>
					<img :src="require(`@/assets/images/discord.svg`)" alt="" draggable="false" class="discord_logo" height="24">
					Unlink Discord
				</button>
				<button class="btn-flat waves-effect">
					<a href="https://vats.im/zabdiscord" target="_blank" rel="noreferrer noopener">Join Discord</a>
				</button>
			</div>
		</div>
	</div>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Recent Connections</span>
		</div>
		<div class="table_wrapper">
			<table class="medium hover striped" v-if="controllingSessions">
				<thead>
					<th>Position</th>
					<th>Sign On</th>
					<th>Sign Off</th>
					<th>Length</th>
				</thead>
				<tbody>
					<tr v-for="session in controllingSessions" :key="session.timeStart">
						<td>{{session.position}}</td>
						<td>{{dtLong(session.timeStart)}}</td>
						<td>{{dtLong(session.timeEnd)}}</td>
						<td>{{sec2hms((new Date(session.timeEnd).getTime() - new Date(session.timeStart).getTime()) / 1000)}}</td>
					</tr>
				</tbody>
			</table>
			<div class="loading_container" v-else>
				<Spinner />
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
			discordConnected: false,
			controllingSessions: null,
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
		await this.getControllingSessions();
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
		async getControllingSessions() {
			const { data: sessionData } = await zabApi.get('/user/sessions');
			this.controllingSessions = sessionData.data;
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
		sec2hms(secs){
			const days = Math.floor(secs / 86400);
			const remainderSeconds = secs % 86400;
			const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19);
			return hms.replace(/^(\d+)/, h => `${+h + days * 24}`.padStart(2, '0'));
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
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.30);

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
	.btn {
		padding-left: 2.5em;
	}

	.discord_logo {
		position: absolute;
		left: 0;
		margin-left: 6px;
		margin-top: 7px;
	}
}

.table_wrapper {
	overflow: auto;

	table {
		min-width: 500px;
	}
}
</style>