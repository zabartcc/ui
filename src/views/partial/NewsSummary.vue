<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Recent News</span>
			<div v-if="!newsItems" class="loading_container">
				<Spinner />
			</div>
			<div v-else-if="newsItems && !newsItems.length" class="no_news">
				No news articles have been posted recently
			</div>
		</div>
		<div class="table_overflow_wrapper" v-if="newsItems && newsItems.length">
			<table class="striped">
				<thead>
					<tr>
						<th>Title</th>
						<th class="options">Date</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="news in newsItems" :key="news.id">
						<td><router-link :to="`/news/${news.uriSlug}`">{{ news.title }}</router-link></td>
						<td class="options">{{ dLong(news.createdAt) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';


export default {
	data() { 
		return {
			newsItems: null,
			page: 1,
			limit: 3
		};
	},
	async mounted() {
		await this.getNews();
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
	}
};
</script>

<style lang="scss" scoped>
.no_news {
	font-style: italic;
}

tbody {
	tr {
		td {
			transition: .3s ease;
		}

		&:hover {
			td {
				background: #EAEAEA;
			}
		}

		a {
			font-weight: 600;
		}
	}
}

</style>