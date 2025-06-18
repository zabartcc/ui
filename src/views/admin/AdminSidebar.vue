<template>
	<div class="admin_sidebar card">
		<div class="collection">
			<router-link to="/admin" class="collection-item">
				Dashboard
				<div class="secondary-content"><i class="material-icons">dashboard</i></div>
			</router-link>
			<router-link to="/admin/controllers" class="collection-item">
				Controllers
				<div class="secondary-content"><i class="material-icons">people</i></div>
			</router-link>
			<router-link to="/admin/activity" class="collection-item" v-if="requiresAuth(['atm', 'datm', 'ta', 'wm'])">
				Controller Activity
				<div class="secondary-content"><i class="material-icons">assessment</i></div>
			</router-link>
			<router-link to="/admin/files/documents" class="collection-item">
				Documents
				<div class="secondary-content"><i class="material-icons">description</i></div>
			</router-link>
			<router-link to="/admin/files/downloads" class="collection-item">
				Downloads
				<div class="secondary-content"><i class="material-icons">insert_drive_file</i></div>
			</router-link>
			<router-link to="/admin/events" class="collection-item" v-if="requiresAuth(['atm', 'datm', 'ta', 'ec'])">
				Events
				<div class="secondary-content"><i class="material-icons">event</i></div>
			</router-link>
			<router-link to="/admin/feedback" class="collection-item" v-if="requiresAuth(['atm', 'datm', 'ta', 'ec'])">
				Feedback
				<div class="secondary-content"><i class="material-icons">feedback</i></div>
			</router-link>
			<router-link to="/admin/absence" class="collection-item" v-if="requiresAuth(['atm', 'datm'])">
				Leave of Absence
				<div class="secondary-content"><i class="material-icons">access_time</i></div>
			</router-link>
			<router-link to="/admin/news" class="collection-item">
				News
				<div class="secondary-content"><i class="material-icons">rss_feed</i></div>
			</router-link>
			<router-link to="/admin/visit/applications" class="collection-item" v-if="requiresAuth(['atm', 'datm'])">
				Visitor Applications
				<div class="secondary-content"><i class="material-icons">group_add</i></div>
			</router-link>
			<router-link to="/admin/log" class="collection-item">
				Action Log
				<div class="secondary-content"><i class="material-icons">pageview</i></div>
			</router-link>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	methods: {
		requiresAuth(roles) {
			const havePermissions = roles.some(r => this.user.data.roleCodes.includes(r));
			if(havePermissions) {
				return true;
			} else {
				return false;
			}
		}
	},
	computed: {
		...mapState('user', [
			'user'
		])
	}
};
</script>

<style scoped lang="scss">
.card.admin_sidebar {
	// position: absolute;
	// top: 0;
	// left: 0;
	// width: 350px;
	// height: 100%;
	// background: $primary-color;
	// color: #fff;
	padding: 0;
}

.collection {
	border: none;
	margin: 0;
	border-radius: 0;

	.collection-header {
		padding: 10px 20px;
		margin: 0;
		font-weight: 700;
		border-bottom: 1px solid #e0e0e0;
		color: $primary-color;
	}

	.collection-item {
		color: $primary-color;
		
		.secondary-content {
			color: $primary-color;
		}

		i {
			margin-right: 10px;
		}

		&:not(.active):hover {
			background-color: $primary-color;
			color: #fff;

			.secondary-content {
				color: #fff;
			}
		}
	}
}
</style>