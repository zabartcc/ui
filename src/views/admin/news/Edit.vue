<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit News Item - {{ title }}</span>
			<div class="row">
				<form method="post" @submit.prevent=updateNews>
					<div class="input-field col s6">
						<input id="title" type="text" v-model="news.title" required>
						<label for="title">Title</label>
					</div>
					<div class="input-field col s12">
						<textarea id="content" class="materialize-textarea" v-model="news.content"></textarea>
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
import { zabApi } from '@/helpers/axios.js';

export default {
	data() {
		return {
			title: '',
			news: {}
		};
	},
	async mounted() {
		const { data } = await zabApi.get(`/news/${this.$route.params.slug}`);
		if(data.ret_det.code === 200) {
			this.news = data.data[0];
			this.title = this.news.title;
			this.loaded = true;
			this.$nextTick(() => {
				M.updateTextFields();
				M.textareaAutoResize(document.querySelector('#content'));
			});
		}
	},
	methods: {
		async updateNews() {
			const { data: resp } = await zabApi.put(`/news/${this.$route.params.slug}`, {
				title: this.news.title,
				content: this.news.content
			});

			if(resp.ret_det.code !== 200) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${resp.ret_det.message} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			} else {
				M.toast({
					html: '<i class="material-icons left">done</i> News succesfully updated! <div class="border"></div>',
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