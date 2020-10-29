<template>
	<h5 class="position_category_heading">{{category.title}}</h5>
	<table class="assignment_list striped">
		<tbody v-if='category.positions.length'>
			<tr v-for="position in category.positions" :key="position.id">
				<td>
					{{position.pos}}
				</td>
				<td class="right">
					{{getName(position.takenBy)}}
				</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr class="no_positions">
				<td colspan="2">There are no {{category.title}} positions for this event.</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: ["category"],
	methods: {
		getName: user => (user) ? `${user.fname} ${user.lname}` : 'Available'
	}
};
</script>

<style scoped lang="scss">
.position_category_heading {
	padding: 0 1rem;
	&:first-of-type {
		margin-top: 0;
	}
}

.assignment_list {
	tr {
		&:hover {
			background: $gray-mild;
		}
	} 

	td {
		padding: 5px 15px;
	}
}

.no_positions {
	font-style: italic;
}

</style>