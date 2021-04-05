<template>
	<div class="row row_no_margin">
		<div class="page_info col s12 l6">
			Showing {{minEntries}}–{{maxEntries}} of {{amount}} entries
		</div>
		<div class="col s12 l6">
			<ul class="pagination right">
				<li :class="isFirstPage ? 'disabled' : 'waves-effect'"><a @click="isFirstPage ? '' : setPreviousPage()"><i class="material-icons">chevron_left</i></a></li>
				<li v-for="pageNo in showPages" class="waves-effect" :class="pageNo == page ? 'active' : ''" :key="pageNo" @click="setPageNo(pageNo)"><a>{{pageNo}}</a></li>
				<li :class="isLastPage ? 'disabled' : 'waves-effect'"><a @click="isLastPage ? '' : setNextPage()"><i class="material-icons">chevron_right</i></a></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	data() {
		return {

		};
	},
	props: ['amount', 'page', 'limit', 'amountOfPages'],
	methods: {
		setNextPage() {
			this.$parent.page += 1;
		},
		setPreviousPage() {
			this.$parent.page -= 1;
		},
		setPageNo(pageNo) {
			console.log(pageNo + ' it works');
			this.$parent.updatePageNo(pageNo);
		}
	},
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
			else return (this.page - 1) * this.limit;
		},
		maxEntries() {
			if(Math.ceil(this.amount / this.limit) == this.page) return this.amount;
			else return this.page * this.limit;
		},
		showPages() {
			const ceiling = Math.ceil(this.amount / this.limit);
			if(ceiling <= 5) {
				return (ceiling);
			} else if (ceiling > 5 && this.page <= 3 && (this.page - 2) <= this.amountOfPages) {
				return 5;
			} else if (ceiling > 5 && this.page > (this.amountOfPages - 2)) {
				if(this.page != this.amountOfPages) {
					return [this.page - 3, this.page -2, this.page -1, this.page, this.page + 1];
				} else {
					return [this.page - 4, this.page -3, this.page -2, this.page -1, this.page];
				}
			} else {
				let array = [];
				let j = -1; // array starts at zero
				for(let i = (this.page - 2); i < (this.page + 3); i++) {
					j++;
					array[j] = i;
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
</style>