<template>
	<div v-if=loaded>
		<div v-if=newsItems.length>
			<div class="card" v-for='news in newsItems' :key=news.id>
				<div class="card-content">
					<router-link :to="`/news/${news.uriSlug}`" class="right tooltipped" data-tooltip="Permalink" aria-label="Permalink">
						<i class="material-icons">link</i>
					</router-link>
					<span class="card-title">{{news.title}}</span>
					<h6>Posted By: {{news.createdBy.fname}} {{news.createdBy.lname}} on {{newsPostDate(news)}}</h6>
				</div>
				<div class="card-content">
					<p class="news_content">{{news.content}}</p>
				</div>
			</div>
		</div>
		<div class="card" v-else>
			<div class="card-content">
				<span class="card-title">No News Items</span>
				<p class="italic">We're sorry, we couldn't find any news items.</p>
			</div>
		</div>
	</div>
	<div class="card" v-else>
		<div class="card-content loading">
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
			loaded: false
		};
	},
	async mounted() {
		const { data } = await zabApi.get('/news');
		if(data.ret_det.code === 200) {
			this.newsItems = data.data;
			this.loaded = true;
		}
		this.$nextTick(() => {
			M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
				margin: 0
			});
		});
	},
	methods: {
		newsPostDate(n) {
			const date = new Date(n.createdAt);
			return date.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'});
		}
	}

};
</script>

<style lang="scss" scoped>
	.news_content {
		white-space: pre;
	}
	
	.italic {
		font-style: italic;
	}
</style>