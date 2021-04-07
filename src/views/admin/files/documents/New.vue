<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Document</span>
			<div class="row row_no_margin">
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
						<textarea id="description" class="materialize-textarea" data-length="400" v-model="form.description"></textarea>
						<label for="description">Description (optional)</label>
					</div>
					<div class="col s12 radio_select">
						<span class="title">Type</span>
						<p>
							<label>
								<input type="radio" value="file" v-model="form.type" />
								<span>File</span>
							</label>
							<label>
								<input type="radio" value="doc" v-model="form.type"/>
								<span>Document</span>
							</label>
						</p>
					</div>
					<div class="col s12" v-show="type === 'doc'">
						<span class="title">Content</span>
						<div id="tui_editor"></div>
					</div>
					<div class="file-field input-field col s12" v-if="type === 'file'">
						<div class="btn">
							<span>FILE</span>
							<input type="file" ref="download" id="fileInput" required>
						</div>
						<div class="file-path-wrapper">
							<input class="file-path validate" type="text" placeholder="Upload a file">
						</div>
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
import {mapState} from 'vuex';

export default {
	name: 'NewDoc',
	title: 'New Document',
	data() {
		return {
			form: {
				name: '',
				category: '',
				description: '',
				content: '',
				type: ''
			},
			editor: null
		};
	},
	async mounted() {
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});

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
			if(this.form.type === 'doc') {
				this.form.content = this.editor.getMarkdown();
				const {data: addData} = await zabApi.post('/file/documents', this.form);

				if(addData.ret_det.code === 200) {
					this.toastSuccess('Document successfully created');

					this.$router.push('/admin/files/documents');
				} else {
					this.toastError(addData.ret_det.message);
				}
			} else {
				this.toastInfo('Uploading...');
				const formData = new FormData();
				formData.append('name', this.form.name);
				formData.append('category', this.form.category);
				formData.append('description', this.form.description);
				formData.append('download', this.$refs.download.files[0]);
				formData.append('author', this.user.data._id);
				formData.append('type', this.form.type);

				const {data} = await zabApi.post(`/file/documents`, formData, {
					headers: { 
						'Content-Type': 'multipart/form-data'
					}
				});

				if(data.ret_det.code === 200) {
					this.toastSuccess('File successfully added');

					document.getElementById("fileInput").value = "";
					this.$router.push('/admin/files/documents');
				} else {
					this.toastError(data.ret_det.message);
				}
			}
		}
	},
	computed: {
		...mapState('user', [
			'user'
		]),
	}
};
</script>

<style scoped lang="scss">
.title {
	color: #9E9E9E;
	font-size: .75rem;
}

p label {
	margin-right: 1.5em;
}

.radio_select {
	margin-bottom: 1em;
}
</style>