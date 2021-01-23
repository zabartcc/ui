<template>
	<div v-if=loaded>
		<div class="card">
			<div class="card-content">
				<span class="card-title">{{news.title}}</span>
				<h6>Posted By: {{news.createdBy.fname}} {{news.createdBy.lname}} on {{newsPostDate(news)}}</h6>
			</div>
			<div class="card-content">
				<p class="news_content">{{news.content}}</p>
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
			news: [],
			loaded: false
		};
	},
	async mounted() {
		const { data } = await zabApi.get(`/news/${this.$route.params.slug}`);
		if(data.ret_det.code === 200) {
			this.news = data.data[0];
			this.loaded = true;
		}
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
</style>