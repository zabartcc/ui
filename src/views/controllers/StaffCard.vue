<template>
	<div class="card">
		<div class="card-content">
			<h5 class="staff_heading">{{ staffItem.title }}</h5>
			<div v-if="staffItem.users.length">
				<span v-for="user in staffItem.users" :key="user.cid" class="staff_member"><router-link :to="`/controllers/${user.cid}`">{{ user.fname }} {{ user.lname }}</router-link></span>
			</div>
			<div v-else>
				<span class="staff_member">Vacant</span>
			</div>
			<a :href="`mailto:${staffItem.email ? staffItem.email : staffItem.code}@vatusa.net`" class="staff_email"><i class="material-icons">email</i> {{ staffItem.email ? staffItem.email : staffItem.code }}@vatusa.net</a>
		</div>
	</div>
</template>

<script>
export default {
	props: ['staffItem']
};
</script>

<style scoped lang="scss">
.card-content {
	padding: 0.75em;
	text-align: center;
}

.staff_heading {
	margin-top: 0;
	font-size: 1rem;
	font-weight: 700;
}

.staff_email {
	display: inline-flex;
	align-items: center;
	margin-top: 0.5em;

	.material-icons {
		font-size: 16px;
		margin-top: 0.2em;
		margin-right: 0.2em;
	}
}

.staff_member {
	font-size: 1.2rem;
	font-weight: 600;
	display: block;
}
</style>