<template>
	<div class="card">
		<div class="loading_container" v-if="!news">
			<Spinner />
		</div>
		<div v-else>
			<div class="card-content">
				<div class="row row_no_margin">
					<div class="col s12 l10 card-title">{{news.title}}</div>
					<div class="col s12 l2 side-title">{{dLong(news.createdAt)}}</div>
					<div class="col s12 author">
						By {{news.user.fname}} {{news.user.lname}}
					</div>
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

export default {
	data() {
		return {
			news: null
		};
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
	margin-bottom: 0!important;
}

.side-title {
	margin-top: .4em;
}

.author {
	font-weight: 400;
	color: #9e9e9e;
}

.news_content {
	margin-top: 1em;
	white-space: pre;
}
</style>