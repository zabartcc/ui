<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Download</span>
			<div class="loading_container" v-if="loading === true">
				<Spinner />
			</div>
			<div class="row row_no_margin" v-else>
				<form method="post" enctype="multipart/form-data" @submit.prevent=submitForm>
					<div class="input-field col s12 l6">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name" class="active">Name</label>
					</div>
					<div class="input-field col s12 l6">
						<select id="category" v-model="form.category" class="materialize-select">
							<option value="" disabled selected>Choose a category</option>
							<option value="veram">vERAM</option>
							<option value="vstars">vSTARS</option>
							<option value="vatis">vATIS</option>
							<option value="misc">Miscellaneous</option>
						</select>
						<label>Category</label>
					</div>
					<div class="input-field col s12">
						<textarea id="description" class="materialize-textarea" data-length="400" v-model="form.description"></textarea>
						<label for="description" class="active">Description (optional)</label>
					</div>
					<div class="file-field input-field col s12">
						<div class="btn">
							<span>FILE</span>
							<input type="file" ref="download">
						</div>
						<div class="file-path-wrapper">
							<input class="file-path validate" type="text" v-model="form.fileName">
						</div>
					</div>
					<div class="input-field col s12">
						<input type="submit" class="btn waves-effect waves-light right" value="update" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'EditDownload',
	data() {
		return {
			form: {
				name: '',
				category: '',
				description: '',
				fileName: ''
			},
			loading: true
		};
	},
	async mounted() {
		await this.getDownload();
		this.setTitle(`Edit ${this.form.name}`);
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
		M.textareaAutoResize(document.querySelector('textarea'));
	},
	methods: {
		async getDownload() {
			this.loading = true;
			const {data} = await zabApi.get(`/file/downloads/${this.$route.params.id}`);
			this.form = data.data;
			this.loading = false;
		},
		async submitForm() {
			try {
				const formData = new FormData();
				formData.append('name', this.form.name);
				formData.append('category', this.form.category);
				formData.append('description', this.form.description);
				formData.append('download', this.$refs.download.files[0]);

				const {data} = await zabApi.put(`/file/downloads/${this.$route.params.id}`, formData, {
					headers: { 
						'Content-Type': 'multipart/form-data'
					}
				});

				if(data.ret_det.code === 200) {
					this.toastSuccess('Download updated');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		}
	}
};
</script>
