<template>
	<div class="notif_container">
		<div class="loading_container" v-if="!notifications">
			<Spinner />
		</div>
		<span class="no_notif" v-else-if="!notifications.length">You have no new notifications</span>
		<div v-else>
			<div class="notif" v-for="notification in notifications" :key="notification._id" @click="redirectTo(notification.link, notification._id)">
				<div class="notif_unread" v-if="notification.read === false"></div>
				<div :class="`notif_title ${notification.read ? '' : 'unread'}`">{{ notification.title }}</div>
				<div class="notif_text" v-html="notification.content"></div>
			</div>
			<span class="load_more" v-if="amount > (page * limit)" @click="getMoreNotifications">Load More</span>
		</div>
	</div>
	<div class="controls">
		<button class="left btn-flat waves-effect" @click="deleteAll">Delete All</button>
		<button class="right btn-flat waves-effect" @click="readAll">Mark All as Read</button>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	name: "Notifications",
	data() {
		return {
			notifications: null,
			unread: 0,
			amount: 0,
			page: 1,
			limit: 10
		};
	},
	async mounted() {
		await this.getNotifications();
	},
	methods: {
		async getNotifications() {
			try {
				const { data } = await zabApi.get(`/user/notifications`, {
					params: {
						page: this.page, 
						limit: this.limit
					}
				});
				this.unread = data.data.unread;
				this.amount = data.data.amount;
				this.notifications = data.data.notif;

				if(this.unread) this.$parent.unread = true;
			} catch(e) {
				console.log(e);
			}
		},
		async getMoreNotifications() {
			this.page += 1;

			const { data } = await zabApi.get(`/user/notifications`, {
				params: {
					page: this.page, 
					limit: this.limit
				}
			});

			this.notifications = this.notifications.concat(data.data.notif);
		},
		async redirectTo(link, id) {
			try {
				await zabApi.put(`/user/notifications/read/${id}`);
				this.$router.push(link);
			} catch(e) {
				console.log(e);
			}
		},
		async readAll() {
			try {
				await zabApi.put(`/user/notifications/read/all`);
				this.notifications.forEach((notif) => {
					if(notif.read === false) notif.read = true;
				});
				this.$parent.unread = false;
			} catch(e) {
				console.log(e);
			}
		},
		async deleteAll() {
			try {
				if(this.notifications.length) {
					await zabApi.delete(`/user/notifications`);
					this.notifications = [];
					this.$parent.unread = false;
					this.toastSuccess('Deleted all notifications successfully');
				} else this.toastInfo('You have no notifications');
			} catch(e) {
				console.log(e);
			}
		}
	}
};

</script>

<style scoped lang="scss">
.notif_container {
	min-width: 230px;
	font-size: 1rem;
	max-width: 300px;
	max-height: 330px;
	overflow: auto;
	display: flex;
	flex-direction: column;

	.no_notif {
		font-style: italic;
		padding: 0 1em 1em 0;
	}

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background: $primary-color-light;
		border-radius: 5px;
		border: 4px solid rgba(0, 0, 0, 0);
		-webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
		background-clip: padding-box;
	}

	.load_more {
		padding: .8em 0 .8em 0;
		text-align: center;
		cursor: pointer;

		&:hover {
			color: $primary-color-light;
		}
	}

	.notif {
		padding: .8em 0 .8em 0;
		border-bottom: 1px solid #EEEEEE;
		position: relative;
		cursor: pointer;

		&:first-child {
			padding-top: 0;
		}

		&:last-child {
			border-bottom: none;
		}

		.notif_title {
			font-size: 1rem;
			padding-left: 1.1em;
			
			&.unread {
				font-weight: 600;
			}
		}

		.notif_text {
			font-size: .95rem;
			margin-top: .5em;
			font-weight: 400;
			padding-left: 1.1em;
			padding-right: .25em;
		}

		.notif_unread {
			height: 7px;
			width: 7px;
			background-color: $primary-color-light;
			border-radius: 50%;
			display: inline-block;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}

.controls {
	border-top: 1px solid #EEEEEE;
	padding-top: .5em;
	font-size: .8rem;
	
	button {
		font-size: 12px;
		height: 2em;
		line-height: 2;
		padding: 0 0.5em;
		margin-left: -.5em;
		margin-right: -.5em;
	}
}
</style>