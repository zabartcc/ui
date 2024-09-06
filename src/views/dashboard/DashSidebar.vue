<template>
	<div class="admin_sidebar card">
		<div class="collection">
			<router-link to="/dash" class="collection-item">
				Dashboard
				<div class="secondary-content"><i class="material-icons">home</i></div>
			</router-link>
			<router-link to="/dash/profile" class="collection-item">
				Edit Profile
				<div class="secondary-content"><i class="material-icons">edit</i></div>
			</router-link>
			<router-link to="/ids" class="collection-item">
				IDS
				<div class="secondary-content"><i class="material-icons">computer</i></div>
			</router-link>
			<a href="https://training.zabartcc.net/" class="collection-item">
				Training Sessions
				<div class="secondary-content"><i class="material-icons">insert_invitation</i></div>
			</a>
			<router-link to="/dash/feedback" class="collection-item">
				Feedback
				<div class="secondary-content"><i class="material-icons">feedback</i></div>
			</router-link>
		</div>
	</div>
</template>

<style scoped lang="scss">
.card.admin_sidebar {
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