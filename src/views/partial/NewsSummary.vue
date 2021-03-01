<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Recent News</span>
			<div v-if="!newsItems" class="loading_container">
				<Spinner />
			</div>
			<div v-else-if="newsItems && newsItems.length === 0" class="no_news">
				There are no recent news articles to display.
			</div>
			<div v-else>
				<div class="collection">
					<router-link class="collection-item news_item" v-for='news in newsItems' :key="news.id" :to="`/news/${news.uriSlug}`">
						{{news.title}}
						<span class="badge">{{formatDate(news.createdAt)}}z</span>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {NewsMixin} from '@/mixins/NewsMixin.js';
import Spinner from '@/components/Spinner.vue';


export default {
	data() { 
		return {
			newsItems: null,
			page: 1,
			limit: 1
		};
	},
	components: {
		Spinner
	},
	mixins: [NewsMixin],
	async mounted() {
		await this.getNews();
	},
	methods: {
		async getNews() {
			const data = await this.getNewsMixin(this.page, this.limit);
			if(data.ret_det.code === 200) {
				this.newsItems = data.data.slice(0,3);
			}
		},
		formatDate(date) {
			const d = new Date(date);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false});
		}
	}
};
</script>

<style lang="scss" scoped>
.no_news {
	font-style: italic;
	margin-top: -1em;
	padding: 1em;
}

.news_item {
	color: $primary-color!important;
	font-weight: bold;
	padding: .7em 1.2em;

	.badge {
		font-weight: normal;
	}
}

.collection {
	border: none;
	padding: 0;
}

.card-title {
	padding: 15px 15px 0 15px;
}

.card-content {
	padding: 0;
}
</style>