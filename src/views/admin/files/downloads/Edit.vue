<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Download</span>
			<div class="row">
				<form method="post" enctype="multipart/form-data" @submit.prevent=submitForm>
					<div class="input-field col s6">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name" class="active">Name</label>
					</div>
					<div class="input-field col s6">
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
						<input id="description" type="text" v-model="form.description">
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
import { FileMixin } from '@/mixins/FileMixin.js';
import { zabApi } from '@/helpers/axios.js';
import router from '@/router/index.js';

export default {
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
		M.FormSelect.init(document.querySelectorAll('select'), {});
	},
	mixins: [FileMixin],
	methods: {
		async getDownload() {
			this.form = await this.getSingleDownloadMixin(this.$route.params.id);
		},
		async submitForm() {
			const formData = new FormData();
			formData.append('name', this.form.name);
			formData.append('category', this.form.category);
			formData.append('description', this.form.description);
			formData.append('download', this.$refs.download.files[0]);

			zabApi.put(`/file/downloads/${this.$route.params.id}`, formData, {
				headers: { 
					Authorization: `Bearer ${localStorage.getItem('token') || null}`,
					'Content-Type': 'multipart/form-data'
				}
			}).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Download succesfully updated! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				router.push('/admin/files/downloads');
			}).catch((err) => {
				console.log(err);
				M.toast({
					html: `<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			});
		}
	}
};
</script>

<style scoped lang="scss">

</style>