<template>
	<h6 class="position_category_heading">{{category.title}}</h6>
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
	font-weight: 600;
}

.assignment_list {
	tr {
		transition: background-color .3s ease;
		&:hover {
			background: #eaeaea;
		}
	} 

	td {
		padding: 5px 15px;
	}
}

.no_positions {
	font-style: italic;
}

tbody {
	border-top: 1px solid #666;
}
</style>