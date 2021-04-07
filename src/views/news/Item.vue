<template>
	<div class="card">
		<div class="loading_container" v-if="!news">
			<Spinner />
		</div>
		<div v-else>
			<div class="card-content">
				<div class="row row_no_margin">
					<div class="col s12 l10 card-title">{{news.title}}</div>
					<div class="col s12 author">
						By {{news.user.fname}} {{news.user.lname}} on {{dLong(news.createdAt)}}
					</div>
				</div>
				<div class="news_content"></div>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default {
	data() {
		return {
			news: null
		};
	},
	async mounted() {
		await this.getArticle();
		this.setTitle(this.news.title);

		this.$nextTick(() => {
			this.viewer = new Viewer({
				el: document.getElementById('news_content'),
				height: '600px',
				initialValue: this.news.content
			});

		});
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
	white-space: pre-line;
}
</style>