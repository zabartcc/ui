<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">News Articles</span>
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
						<th class="right">Date</th>
					</tr>
				</thead>
				<tbody class="news_list_row">
					<tr v-for="news in newsItems" :key="news._id" @click="goToArticle(news.uriSlug)">
						<td class="title">{{news.title}}</td>
						<td class="right">{{formatDate(news.createdAt)}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="newsItems && newsAmount > 0">
			<Pagination :amount="newsAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';
import Pagination from '@/components/Pagination.vue';

export default {
	name: 'News',
	title: 'News',
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
		Spinner,
		Pagination
	},
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
			const {data} = await zabApi.get('/news', {
				params: {
					page: this.page, 
					limit: this.limit
				}
			});
			if(data.ret_det.code === 200) {
				this.newsItems = data.data.slice(0,3);
				this.newsAmount = data.amount;
			}
		},
		formatDate(date) {
			const d = new Date(date);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'});
		},
		async goToArticle(slug) {
			this.$router.push(`/news/${slug}`);
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
.no_news {
	font-style: italic;
	margin-top: -1em;
	padding: 0 1em 1em 1em;
}

.news_list_row {
	tr {
		cursor: pointer;
		transition: .3s ease;

		.title {
			color: $primary-color;
			font-weight: bold;
		}

		&:hover {
			background: #eaeaea;
		}
	}
}
</style>