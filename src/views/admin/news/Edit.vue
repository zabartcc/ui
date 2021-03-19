<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Article</span>
			<div class="loading_container" v-if="!news">
				<Spinner />
			</div>
			<div class="row row_no_margin" v-else>
				<form method="post" @submit.prevent=updateNews>
					<div class="input-field col s12">
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

export default {
	name: 'EditNews',
	data() {
		return {
			news: null
		};
	},
	async mounted() {
		await this.getArticle();
		this.setTitle(`Edit ${this.news.title}`);
		M.updateTextFields();
		M.textareaAutoResize(document.querySelector('#content'));
	},
	methods: {
		async getArticle() {
			const {data} = await zabApi.get(`/news/${this.$route.params.slug}`);
			this.news = data.data;
		},
		async updateNews() {
			const {data} = await zabApi.put(`/news/${this.$route.params.slug}`, this.news);

			if(data.ret_det.code === 200) {
				this.toastSuccess('News article successfully updated');

				this.$router.push('/admin/news');
			} else {
				this.toastError(data.ret_det.message);
			}
		},
	},
};
</script>

<style>

</style>