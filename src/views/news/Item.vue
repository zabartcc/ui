<template>
	<div class="card">
		<div class="loading_container" v-if="!news">
			<Spinner />
		</div>
		<div v-else>
			<div class="card-content">
				<div class="row row_no_margin">
					<div class="card-title col s12 l8">{{news.title}}</div>
					<div class="side-title col s12 l4">{{formatDate(news.createdAt)}}</div>
				</div>
				<div class="author">
					By {{news.createdBy.fname}} {{news.createdBy.lname}}
				</div>
				<div class="news_content">
					{{news.content}}
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
			news: null
		};
	},
	components: {
		Spinner
	},
	mixins: [NewsMixin],
	async mounted() {
		await this.getArticle();
	},
	methods: {
		async getArticle() {
			const {data} = await this.getArticleMixin(this.$route.params.slug);
			this.news = data;
		},
		formatDate(date) {
			const d = new Date(date);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'});
		}
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