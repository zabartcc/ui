<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Create News Article</span>
			<div class="row">
				<form method="post" @submit.prevent=createNews>
					<div class="input-field col s12">
						<input id="title" type="text" v-model="form.title" required>
						<label for="title">Title</label>
					</div>
					<div class="input-field col s12">
						<span class="title">Content</span>
						<div id="tui_editor"></div>
					</div>
					<div class="input-field col s12">
						<input type="submit" class="btn waves-effect waves-light right" value="create" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import {mapState} from 'vuex';
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'NewNews',
	title: 'Create News Article',
	data() {
		return {
			form: {
				title: "",
				content: "",
			}
		};
	},
	computed: {
		...mapState('user', [
			'user'
		])
	},
	async mounted() {
		this.$nextTick(() => {
			this.editor = new Editor({
				el: document.querySelector('#tui_editor'),
				height: '500px',
				initialEditType: 'markdown',
				previewStyle: 'tab',
				usageStatistics: false
			});
		});
	},
	methods: {
		async createNews() {
			const {data} = await zabApi.post('/news', {
				title: this.form.title,
				content: this.editor.getMarkdown(),
				createdBy: this.user.data.cid
			});

			if(data.ret_det.code === 200) {
				this.toastSuccess('News article created');

				this.$router.push('/admin/news');
			} else {
				this.toastError(data.ret_det.message);
			}
		}
	},
};
</script>

<style scoped lang="scss">
.title {
	color: #9E9E9E;
	font-size: .75rem;
}
</style>