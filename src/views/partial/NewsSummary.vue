<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Latest News</span>
		</div>
		<div v-if=loaded>
			<div class="collection" v-if=newsItems.length>
				<router-link class="collection-item" v-for='news in newsItems' :key="news.id" :to="`/news/${news.uriSlug}`">
					{{news.title}}
					<span class="badge">{{newsPostDate(news)}}</span>
				</router-link>
			</div>
			<p class="no_news" v-else>There are no news items.</p>
		</div>
		<div class="card-content loading" v-else>
			<Spinner />
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';


export default {
	components: {
		Spinner
	},
	data() { 
		return {
			newsItems: [],
			loaded: false,
		};
	},
	async mounted() {
		const { data } = await zabApi.get('/news');
		if(data.ret_det.code === 200) {
			this.newsItems = data.data.slice(0,3);
			this.loaded = true;
		}
	},
	methods: {
		newsPostDate(n) {
			const date = new Date(n.createdAt);
			return date.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false});
		}
	}
};
</script>

<style lang="scss" scoped>
	.no_news {
		padding: 0 15px 15px 15px;
		font-style: italic;
		margin-top: 0;
	}
</style>