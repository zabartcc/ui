<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Document</span>
			<div class="row">
				<form method="post" @submit.prevent=addDocument>
					<div class="input-field col s12 m6">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name">Name</label>
					</div>
					<div class="input-field col s12 m6">
						<select id="category" v-model="form.category">
							<option value="" disabled selected>Choose a category</option>
							<option value="sop">SOP</option>
							<option value="loa">LOA</option>
							<option value="policy">Policies</option>
							<option value="misc">Miscellaneous</option>
						</select>
						<label>Category</label>
					</div>
					<div class="input-field col s12">
						<input id="description" type="text" v-model="form.description">
						<label for="description">Description (optional)</label>
					</div>
					<div class="col s12">
						<span class="title">Content</span>
						<div id="tui_editor"></div>
					</div>
					<div class="input-field col s12">
						<input type="submit" class="btn right" value="create" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import Editor from '@toast-ui/editor';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'; // Merging cells for SOPs
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import {zabApi} from '@/helpers/axios.js';


export default {
	name: 'NewDoc',
	title: 'New Document',
	data() {
		return {
			form: {
				name: '',
				category: '',
				description: '',
				content: ''
			},
			editor: null,
		};
	},
	async mounted() {
		M.FormSelect.init(document.querySelectorAll('select'), {});
		this.$nextTick(() => {
			this.editor = new Editor({
				el: document.querySelector('#tui_editor'),
				height: '500px',
				initialEditType: 'markdown',
				previewStyle: 'tab',
				usageStatistics: false,
				plugins: [tableMergedCell]
			});
		});
	},
	methods: {
		async addDocument() {
			this.form.content = this.editor.getMarkdown();
			const {data: addData} = await zabApi.post('/file/documents', this.form);

			if(addData.ret_det.code === 200) {
				this.toastSuccess('Document successfully created');

				this.$router.push('/admin/files/documents');
			} else {
				this.toastError(addData.ret_det.message);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.title {
	color: #9E9E9E;
	font-size: .75rem;
}
</style>