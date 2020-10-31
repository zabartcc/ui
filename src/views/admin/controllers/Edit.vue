<template>
	<div v-if=controller class="card">
		<div class="card-content">
			<span class="card-title">Edit Controller - {{controller.lname}}, {{controller.fname}}</span>
		</div>
	</div>
</template>

<script>
import { ControllerMixin } from '@/mixins/ControllerMixin.js';
export default {
	data() {
		return {
			controller: null,
		};
	},
	mixins: [ControllerMixin],
	async mounted() {
		this.controller = await this.getControllerMixin(this.$route.params.cid);
	}
};
</script>

<style>

</style>