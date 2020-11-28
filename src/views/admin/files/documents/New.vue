<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Document</span>
			<div class="row">
				<form method="post" enctype="multipart/form-data">
					<div class="input-field col s6">
						<input id="name" type="text" v-model="form.name" required>
						<label for="name">Name</label>
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
						<label for="description">Description (optional)</label>
					</div>
					<div class="input-field col s12">
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
export default {
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
	},
	methods: {
	}
};
</script>

<style scoped lang="scss">

</style>