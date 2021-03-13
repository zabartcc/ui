<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Create News Article</span>
			<div class="row">
				<form method="post" @submit.prevent=createNews>
					<div class="input-field col s12 l6">
						<input id="title" type="text" v-model="form.title" required>
						<label for="title">Title</label>
					</div>
					<div class="input-field col s12">
						<textarea id="content" class="materialize-textarea" v-model="form.content" required></textarea>
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
import { mapState } from 'vuex';
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
	methods: {
		async createNews() {
			const {data} = await zabApi.post('/news', {
				title: this.form.title,
				content: this.form.content,
				createdBy: this.user.data.cid
			});

			if(data.ret_det.code !== 200) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${data.ret_det.message} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			} else {
				M.toast({
					html: '<i class="material-icons left">done</i> News article succesfully created<div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$router.push('/admin/news');
			}
		}
	},
};
</script>

<style>

</style>