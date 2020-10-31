<template>
	<div class="admin_sidebar card">
		<div class="collection">
			<router-link to="/admin" class="collection-item">
				Admin Home
				<div class="secondary-content"><i class="material-icons">home</i></div>
			</router-link>
			<h6 class="collection-header">Controllers</h6>
			<router-link to="/admin/controllers" class="collection-item">
				Find a Controller
				<div class="secondary-content"><i class="material-icons">people</i></div>
			</router-link>
			<router-link to="/admin/controllers/visitor" class="collection-item">
				Add a Visitor
				<div class="secondary-content"><i class="material-icons">person_add</i></div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {

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