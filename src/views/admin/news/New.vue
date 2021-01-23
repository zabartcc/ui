<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New News Item</span>
			<div class="row">
				<form method="post" @submit.prevent=createNews>
					<div class="input-field col s6">
						<input id="title" type="text" v-model="form.title" required>
						<label for="title">Title</label>
					</div>
					<div class="input-field col s12">
						<textarea id="content" class="materialize-textarea" v-model="form.content"></textarea>
						<label for="content">Content</label>
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
import { zabApi } from '@/helpers/axios.js';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			form: {
				title: '',
				content: '',
			}
		};
	},
	methods: {
		async createNews() {
			const {data} = await zabApi.post('/news', {
				title: this.form.title,
				content: this.form.content,
				createdBy: this.getUserId()
			});

			if(data.ret_det.code !== 200) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${data.ret_det.message} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			} else {
				M.toast({
					html: '<i class="material-icons left">done</i> News succesfully posted! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$router.push('/admin/news');
			}
		},
		...mapGetters('user', [
			'getUserId'
		])
	},
};
</script>

<style>

</style>