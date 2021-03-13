<template>
	<div class="card">
		<div class="loading_container" v-if="!news">
			<Spinner />
		</div>
		<div v-else>
			<div class="card-content">
				<div class="row row_no_margin">
					<div class="card-title col s12 l8">{{news.title}}</div>
					<div class="side-title col s12 l4">{{dLong(news.createdAt)}}</div>
				</div>
				<div class="author">
					By {{news.user.fname}} {{news.user.lname}}
				</div>
				<div class="news_content">
					{{news.content}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

export default {
	data() {
		return {
			news: null
		};
	},
	components: {
		Spinner
	},
	async mounted() {
		await this.getArticle();
		this.setTitle(this.news.title);
	},
	methods: {
		async getArticle() {
			const {data} = await zabApi.get(`/news/${this.$route.params.slug}`);
			this.news = data.data;
		},
	}

};
</script>

<style lang="scss" scoped>
.card-title {
	font-weight: bold;
}

.side-title {
	text-align: right;
}

.author {
	font-weight: 400;
	margin-bottom: 1em;
	color: #9e9e9e;
}

.news_content {
	white-space: pre;
}
</style>