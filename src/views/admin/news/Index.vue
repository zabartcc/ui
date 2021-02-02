<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">News Articles</span></div>
				<div class="card-title col s4"><router-link to="/admin/news/new"><span class="btn right">New Article</span></router-link></div>
			</div>
		</div>
		<div class="loading_container" v-if="!newsItems">
			<Spinner />
		</div>
		<p class="no_news" v-else-if="newsItems && newsItems.length === 0">There are no news articles to display.</p>
		<div class="news_wrapper" v-else>
			<table class="news_list striped">
				<thead class="news_list_head">
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Date</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="news_list_row">
					<tr v-for="(news, i) in newsItems" :key="news._id">
						<td>{{news.title}}</td>
						<td>{{news.createdBy.fname + ' ' + news.createdBy.lname}}</td>
						<td>{{formatDate(news.createdAt)}}</td>
						<td class="options">
							<router-link data-position="top" data-tooltip="Edit Event" class="tooltipped" :to="`/admin/news/${news.uriSlug}`">
								<i class="material-icons">edit</i>
							</router-link>
							<a :href="`#modal_delete_${i}`" data-position="top" data-tooltip="Delete Event" class="tooltipped modal-trigger">
								<i class="material-icons red-text text-darken-2">delete</i>
							</a>
						</td>
						<div :id="`modal_delete_${i}`" class="modal modal_delete">
							<div class="modal-content">
								<h4>Are you sure?</h4>
								<p>Are you sure you want to delete this news article?</p>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="deleteNews(news.uriSlug)">I'm sure</a>
								<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="row row_no_margin" v-if="newsItems && newsAmount > 0">
			<div class="page_info col s12 l6">
				Showing {{minEntries}}–{{maxEntries}} of {{newsAmount}} entries
			</div>
			<div class="col s12 l6">
				<ul class="pagination right">
					<li :class="isFirstPage ? 'disabled' : 'waves-effect'"><a @click="isFirstPage ? '' : page -= 1"><i class="material-icons">chevron_left</i></a></li>
					<li v-for="pageNo in showPages" class="waves-effect" :class="pageNo == page ? 'active' : ''" :key="pageNo" @click="page = pageNo"><a>{{pageNo}}</a></li>
					<li :class="isLastPage ? 'disabled' : 'waves-effect'"><a @click="isLastPage ? '' : page += 1"><i class="material-icons">chevron_right</i></a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {NewsMixin} from '@/mixins/NewsMixin.js';
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

export default {
	data() {
		return {
			newsItems: null,
			newsAmount: 0,
			page: 1,
			limit: 10,
			amountOfPages: 1
		};
	},
	components: {
		Spinner
	},
	mixins: [NewsMixin],
	async mounted() {
		await this.getNews();
		this.amountOfPages = Math.ceil(this.newsAmount / this.limit);
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	methods: {
		async getNews() {
			const data = await this.getNewsMixin(this.page, this.limit);
			if(data.ret_det.code === 200) {
				this.newsItems = data.data.slice(0,3);
				this.newsAmount = data.amount;
			}
		},
		formatDate(date) {
			const d = new Date(date);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'});
		},
		async deleteNews(slug) {
			const { data: resp } = await zabApi.delete(`/news/${slug}`);
			if(resp.ret_det.code !== 200) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${resp.ret_det.message} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			} else {
				M.toast({
					html: '<i class="material-icons left">done</i> News succesfully deleted! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$nextTick(async () => {
					M.Modal.getInstance(document.querySelector('.modal_delete')).close();
					await this.getNews();
				});
			}
		}
	},
	computed: {
		isFirstPage() {
			if(this.page === 1) return true;
			else return false;
		},
		isLastPage() {
			if(this.page * this.limit >= this.newsAmount) return true;
			else return false;
		},
		minEntries() {
			if(this.page === 1) return 1;
			else return (this.page - 1) * this.limit;
		},
		maxEntries() {
			if(Math.ceil(this.newsAmount / this.limit) == this.page) return this.newsAmount;
			else return this.page * this.limit;
		},
		showPages() {
			const ceiling = Math.ceil(this.newsAmount / this.limit);
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
	},
	watch: {
		page: async function() {
			await this.getFeedback();
			M.Modal.init(document.querySelectorAll('.modal'), {
				preventScrolling: false
			});
			M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
				margin: 0
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.options {
	text-align: right;
}
.no_news {
	font-style: italic;
	margin-top: -1em;
	padding: 1em;
}
.page_info {
	padding-left: 1.5em;
	font-size: 0.9rem;
	margin-top: 1.5em;
}
.modal_delete {
	min-width: 400px;
	width: 30%;
}
</style>