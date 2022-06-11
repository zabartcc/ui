<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Download</span>
			<div class="row row_no_margin">
				<form method="post" enctype="multipart/form-data" @submit.prevent=submitForm>
					<div class="input-field col s12 l6">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name">Name</label>
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
						<label for="description">Description (optional)</label>
					</div>
					<div class="file-field input-field col s12">
						<div class="btn waves-effect waves-light">
							<span>FILE</span>
							<input type="file" ref="download" id="fileInput" required>
						</div>
						<div class="file-path-wrapper">
							<input class="file-path validate" type="text" placeholder="Upload a file">
						</div>
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
import {mapState} from 'vuex';
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'NewDownload',
	title:'New Download',
	data() {
		return {
			form: {
				name: '',
				category: '',
				description: ''
			}
		};
	},
	async mounted() {
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
	},
	methods: {
		async submitForm() {
			try {
				this.toastInfo('Uploading...');
				const formData = new FormData();
				formData.append('name', this.form.name);
				formData.append('category', this.form.category);
				formData.append('description', this.form.description);
				formData.append('download', this.$refs.download.files[0]);
				formData.append('author', this.user.data._id);

				const {data} = await zabApi.post(`/file/downloads`, formData, {
					headers: { 
						'Content-Type': 'multipart/form-data'
					}
				});

				if(data.ret_det.code === 200) {
					this.toastSuccess('Download created');

					document.getElementById("fileInput").value = "";
					this.$router.push('/admin/files/downloads');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
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
