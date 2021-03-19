<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Controller Profile</span>
			<div class="loading_container" v-if="form.bio === null">
				<Spinner />
			</div>
			<form class="row row_no_margin user_info" v-else @submit.prevent=updateProfile>
				<div class="input-field col s12">
					<textarea id="bio" class="materialize-textarea" data-length="2000" v-model="form.bio"></textarea>
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
import {mapState} from 'vuex';
import {zabApi} from '@/helpers/axios.js';

export default {
	data() {
		return {
			form: {
				bio: ''
			}
		};
	},
	async mounted() {
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
		this.form.bio = this.user.data.bio || '';
		M.textareaAutoResize(document.querySelectorAll('textarea'));
		M.updateTextFields();
	},
	methods: {
		async updateProfile() {
			const {data} = await zabApi.put('/user/profile', this.form);

			if(data.ret_det.code === 200) {
				this.toastSuccess('Profile successfully updated');
			} else {
				this.toastError(data.ret_det.message);
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

<style scoped lang="scss">
.user_info {
	margin-top: 1em;
}
</style>