<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Document</span>
			<div class="loading_container" v-if="loading === true">
				<Spinner />
			</div>
			<div class="row row_no_margin" v-else>
				<form method="post" @submit.prevent=updateDocument>
					<div class="input-field col s12 m6">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name">Name</label>
					</div>
					<div class="input-field col s12 m6">
						<select id="category" v-model="form.category" class="materialize-select">
							<option value="" disabled selected>Choose a category</option>
							<option value="policy">Policies</option>
							<option value="sop">SOP</option>
							<option value="loa">LOA</option>
							<option value="ref">References</option>
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
					<div class="col s12" v-show="form.type === 'doc'">
						<span class="title">Content</span>
						<div id="tui_editor"></div>
					</div>
					<div class="file-field input-field col s12" v-if="form.type === 'file'">
						<div class="btn waves-effect waves-light">
							<span>FILE</span>
							<input type="file" ref="download" id="fileInput">
						</div>
						<div class="file-path-wrapper">
							<input class="file-path validate" type="text" placeholder="Upload a file" :value="form.fileName">
						</div>
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
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'; // Merging cells for SOPs
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import {zabApi} from '@/helpers/axios.js';

export default {
	title: 'Edit Document',
	data() {
		return {
			form: {
				name: '',
				category: '',
				description: '',
				content: ''
			},
			editor: null,
			loading: true
		};
	},
	async mounted() {
		await this.getDocument();
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
		M.textareaAutoResize(document.querySelector('textarea'));
		this.setTitle(`Edit ${this.form.name}`);

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
				initialValue: this.form.content,
				plugins: [tableMergedCell]
			});
		});
	},
	methods: {
		async getDocument() {
			const {data} = await zabApi.get(`/file/documents/${this.$route.params.id}`);
			this.form = data.data;
			this.loading = false;
		},
		async updateDocument() {
			this.form.content = this.editor.getMarkdown();
			const {data: addData} = await zabApi.put(`/file/documents/${this.form.slug}`, this.form);

			if(addData.ret_det.code === 200) {
				this.toastSuccess('Document updated');
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

p label {
	margin-right: 1.5em;
}

.radio_select {
	margin-bottom: 1em;
}

#tui_editor {
	&:deep(.tui-editor-contents) {
		font-family: "Lato", "Helvetica", sans-serif;
		font-size: 1rem;
	}

	&:deep(code) {
		background-color: $gray_light;
		padding: 0.125em;
		color: $secondary-color-dark;
	}

	&:deep(h1) {
		border-bottom: 2px solid #EBEBEB;
	}

	&:deep(h2) {
		counter-reset: h3;
		font-size: 2em;
		border-bottom: none;
		font-weight: 400;
		color: #000;
		margin-bottom: .25em;

		&:first-of-type {
			margin-top: 0;
		}

		&::before {
			counter-increment: h2;
			content: counter(h2) ". "
		}
	}

	&:deep(h3) {
		counter-reset: h4;
		margin-bottom: 10px;
		font-size: 1.75em;
		font-weight: 400;
		color: #000;

		&::before {
			counter-increment: h3;
			content: counter(h2) "." counter(h3) ". "
		}
	}

	&:deep(h4) {
		counter-reset: h5;
		margin-bottom: 10px;
		font-size: 1.5em;
		font-weight: 400;
		line-height: 110%;
		margin: 1.52rem 0 .912rem 0;
		color: #000;

		&::before {
			counter-increment: h4;
			content: counter(h2) "." counter(h3) "." counter(h4) ". "
		}
	}

	&:deep(h5) {
		margin-bottom: 10px;
		border-bottom: none;
		font-style: normal;
		font-size: 1.25em;
		color: #000;
		font-weight: 400;

		&::before {
			counter-increment: h5;
			content: counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
		}
	}

	&:deep(p) {
		color: #000;
		&+p {
			margin-top: 1.5em;
		}
	}

	&:deep(ul) {
		color: #000;

		li {
			list-style: disc outside;
			margin-left: 2em;

			&::before {
				background-color: #000;
				content: normal;
			}
		}
	}
	
	&:deep(ol) {
		color: #000;

		li {
			&::before {
				color: #000;
			}
		}
	}

	&:deep(a) {
		text-decoration: underline;
	}

	&:deep(table) {
		width: calc(100% + 30px);
		margin-left: -15px;
		display: table;
		border-collapse: collapse;
		border: none;
		border-spacing: 0;
		color: #000;
	}

	&:deep(thead) {
		border-bottom: 1px solid #666;
	}

	&:deep(tbody) {
		display: table-row-group;
		vertical-align: middle;
		border-color: inherit;
	}

	&:deep(tr) {
		border-bottom: none;
	}

	&:deep(tr:nth-child(odd)) {
		background-color: rgba(242, 242, 242, 0.5);
	}

	&:deep(td) {
		padding: 0.25em 1em !important;
		border: none;
	}

	&:deep(th) {
		background-color: #fff;
		color: #000;
		border: none;
		font-weight: 700;
	}
}
</style>