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
						<span class="title">Content</span>
						<div id="tui_editor"></div>
					</div>
					<div class="input-field col s12">
						<input type="submit" class="btn waves-effect waves-light right" value="Update" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
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
		this.$nextTick(() => {
			M.FormSelect.init(document.querySelectorAll('select'), {});
			M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
			M.updateTextFields();
			this.editor = new Editor({
				el: document.querySelector('#tui_editor'),
				height: '500px',
				initialEditType: 'markdown',
				previewStyle: 'tab',
				usageStatistics: false,
				initialValue: this.news.content
			});
		});
	},
	methods: {
		async getArticle() {
			const {data} = await zabApi.get(`/news/${this.$route.params.slug}`);
			this.news = data.data;
		},
		async updateNews() {
			this.news.content = this.editor.getMarkdown();
			const {data} = await zabApi.put(`/news/${this.$route.params.slug}`, this.news);

			if(data.ret_det.code === 200) {
				this.toastSuccess('News article updated');

				this.$router.push('/admin/news');
			} else {
				this.toastError(data.ret_det.message);
			}
		},
	},
};
</script>

<style scoped lang="scss">
.title {
	color: #9E9E9E;
	font-size: .75rem;
}
</style>