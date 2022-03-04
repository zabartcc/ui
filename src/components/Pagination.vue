<template>
	<div class="row row_no_margin">
		<div class="page_info col s12 m4">
			Showing {{ minEntries }}–{{ maxEntries }} of {{ amount }} entries
		</div>
		<div class="col s12 m8">
			<ul class="pagination right">
				<li :class="isFirstPage ? 'disabled' : 'waves-effect'"><a @click="isFirstPage ? '' : $parent.page = $parent.page - 1"><i class="material-icons">chevron_left</i></a></li>
				<li v-for="pageNo in showPages" class="waves-effect" :class="pageNo == page ? 'active' : ''" :key="pageNo" @click="$parent.page = pageNo"><a>{{pageNo}}</a></li>
				<li :class="isLastPage ? 'disabled' : 'waves-effect'"><a @click="isLastPage ? '' : $parent.page = $parent.page + 1"><i class="material-icons">chevron_right</i></a></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: ['amount', 'page', 'limit', 'amountOfPages'],
	computed: {
		isFirstPage() {
			if(this.page == 1) return true;
			else return false;
		},
		isLastPage() {
			if(this.page * this.limit >= this.amount) return true;
			else return false;
		},
		minEntries() {
			if(this.page == 1) return 1;
			else return ((this.page - 1) * this.limit) + 1;
		},
		maxEntries() {
			if(Math.ceil(this.amount / this.limit) == this.page) return this.amount;
			else return this.page * this.limit;
		},
		showPages() {
			const ceiling = Math.ceil(this.amount / this.limit);
			if(ceiling <= 5) return (ceiling);
			else if (ceiling > 5 && this.page <= 3 && (this.page - 2) <= this.amountOfPages) return 5;
			else if (ceiling > 5 && this.page > (this.amountOfPages - 2)) {
				if(this.page != this.amountOfPages) return [this.page - 3, this.page -2, this.page -1, this.page, this.page + 1];
				else return [this.page - 4, this.page -3, this.page -2, this.page -1, this.page];
			} else {
				let array = [];
				let j = 0; // array starts at zero
				for(let i = (this.page - 2); i < (this.page + 3); i++) {
					array[j] = i;
					j++;
				}
				return array;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.page_info {
	padding-left: 1.5em;
	font-size: 0.9rem;
	margin-top: 1.5em;
}

.pagination {
	text-align: right;
}

.material-icons {
	user-select: none;
	margin-top: -3px;
}

@media only screen and (max-width: 600px) {
	.pagination {
		text-align: left;
	}
}
</style>