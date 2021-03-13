<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Article</span>
			<div class="loading_container" v-if="!news">
				<Spinner />
			</div>
			<div class="row" v-else>
				<form method="post" @submit.prevent=updateNews>
					<div class="input-field col s12 l6">
						<input id="title" type="text" v-model="news.title" required>
						<label for="title">Title</label>
					</div>
					<div class="input-field col s12">
						<textarea id="content" class="materialize-textarea" v-model="news.content" required></textarea>
						<label for="content">Content</label>
					</div>
					<div class="input-field col s12">
						<input type="submit" class="btn right" value="Update" />
					</div>
				</form>
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
	async mounted() {
		await this.getArticle();
		M.updateTextFields();
		M.textareaAutoResize(document.querySelector('#content'));
	},
	components: {
		Spinner
	},
	methods: {
		async getArticle() {
			const {data} = await zabApi.get(`/news/${this.$route.params.slug}`);
			this.news = data.data;
		},
		async updateNews() {
			const {data: resp} = await zabApi.put(`/news/${this.$route.params.slug}`, this.news);

			if(resp.ret_det.code !== 200) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${resp.ret_det.message} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			} else {
				M.toast({
					html: '<i class="material-icons left">done</i> News article successfully updated <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$router.push('/admin/news');
			}
		},
	},
};
</script>

<style>

</style>