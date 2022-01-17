<template>
	<div>
		<div class="position_category_heading">{{category.title}}</div>
		<table class="assignment_list striped">
			<tbody v-if="category.positions && category.positions.length">
				<tr v-for="position in category.positions" :key="position.id">
					<td>
						{{ position.pos }}
					</td>
					<td class="right">
						{{ getName(position.user) }}
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr class="no_positions">
					<td colspan="2">There are no {{ category.title }} positions for this event</td>
				</tr>
			</tbody>
		</table>
	</div>
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

	margin-bottom: 1em;
}

.no_positions {
	font-style: italic;
}

tbody {
	border-top: 1px solid #666;
}
</style>