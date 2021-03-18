<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Controller Profile</span>
			<form class="row" @submit.prevent=updateProfile>
				<div class="input-field col s12">
					<textarea id="bio" class="materialize-textarea" data-length="5000" v-model="form.bio"></textarea>
					<label for="bio" class="active">Biography</label>
					
				</div>
				<div class="input-field col s12">
					<input type="submit" class="btn right" value="submit" />
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import {zabApi} from '@/helpers/axios.js';

export default {
	data() {
		return {
			form: {
				bio: null
			}
		};
	},
	mounted() {
		this.form.bio = this.user.data.bio || null;
		this.$nextTick(() => {
			M.CharacterCounter.init(document.querySelectorAll('textarea'));
			M.updateTextFields();
			M.textareaAutoResize(document.querySelector('#bio'));
		});
	},
	methods: {
		async updateProfile() {
			const {data: updateData} = await zabApi.put('/user/profile', this.form);

			if(updateData.ret_det.code === 200) {
				this.toastSuccess('Profile successfully updated.');
			} else {
				this.toastError(updateData.ret_det.message);
			}
		}
	},
	computed: {
		...mapState('user', [
			'user'
		])
	},
};
</script>

<style>

</style>