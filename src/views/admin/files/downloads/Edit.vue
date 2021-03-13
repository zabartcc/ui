<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Download</span>
			<div class="row">
				<form method="post" enctype="multipart/form-data" @submit.prevent=submitForm>
					<div class="input-field col s12 l6">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name" class="active">Name</label>
					</div>
					<div class="input-field col s12 l6">
						<select id="category" v-model="form.category">
							<option value="" disabled selected>Choose a category</option>
							<option value="sectorFiles">Sector Files</option>
							<option value="training">Training</option>
							<option value="mfr">Minor Field References</option>
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
						<input type="submit" class="btn right" value="update" />
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
			}
		};
	},
	async mounted() {
		await this.getDownload();
		this.setTitle(`Edit ${this.form.name}`);
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
	},
	methods: {
		async getDownload() {
			const {data} = await zabApi.get(`/file/downloads/${this.$route.params.id}`);
			this.form = data.data;
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
					M.toast({
						html: '<i class="material-icons left">done</i> Download succesfully updated <div class="border"></div>',
						displayLength: 5000,
						classes: 'toast toast_success',
					});
				} else {
					M.toast({
						html: `<i class="material-icons left">error_outline</i> ${data.ret_det.message} <div class="border"></div>`,
						displayLength: 5000,
						classes: 'toast toast_error'
					});
				}
			} catch(e) {
				console.log(e);
			}
		}
	}
};
</script>