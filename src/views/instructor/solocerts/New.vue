<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Issue Solo Certification</span>
			<div class="spinner_wrapper" v-if="!controllers">
				<Spinner />
			</div>
			<div v-else>
				<div class="card_desc">
					<p>Solo certifications may be issued to students who have demonstrated sufficient competency on the position they are receiving a solo certification for. Solo certifications must be issued in accordance with the training syllabus and are automatically submitted to VATUSA. Please note that solo certifications may not extend beyond thirty days in length.</p>
				</div>
				<form class="row row_no_margin" id="issueForm" @submit.prevent=submitCert>
					<div class="input-field col s12 m6">
						<select v-model="form.cid" required>
							<option value="" disabled selected>Select a controller</option>
							<option v-for="controller in controllers" :value="controller.cid" :key="controller.cid">{{controller.fname}} {{controller.lname}}</option>
						</select>
						<label>Controller</label>
					</div>
					<div class="input-field col s12 m6">
						<input id="position" type="text" minlength=7 maxlength=7 class="validate" placeholder="PHX_APP" v-model="form.position" required>
						<label for="position" class="active">Position</label>
					</div>
					<div class="input-field col s12">
						<input id="exp" type="text" class="validate datepicker" placeholder="Pick a date" v-model="form.expDate" required>
						<label for="exp" class="active">Expiration  Date</label>
					</div>
					<div class="input-field col s12">
						<input type="submit" class="btn right" value="Submit" />
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import {vatusaApiAuth, zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

export default {
	data() {
		return {
			controllers: null,
			form: {
				cid: '',
				position: '',
				expDate: ''
			}
		};
	},
	components: {
		Spinner
	},
	async mounted() {
		await this.getControllers();
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.Datepicker.init(document.querySelectorAll('.datepicker'), {
			autoClose: true,
			format: 'yyyy-mm-dd',
			onSelect: (date) => {
				const d = new Date(date);
				const newDate = `${d.getFullYear()}-${(d.getMonth() + 1)}-${d.getDate()}`;
				this.form.expDate = newDate;
			}
		});
	},
	methods: {
		async getControllers() {
			const {data} = await zabApi.get('/feedback/controllers');
			this.controllers = data;
		},
		async submitCert() {
			const formData = new FormData();
			formData.append('cid', this.form.cid);
			formData.append('position', this.form.position);
			formData.append('expDate', this.form.expDate);
			vatusaApiAuth.post('/solo', formData).then(() => {
				M.toast({
					html: '<i class="material-icons left">done</i> Solo cert succesfully issued! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$router.push('/ins/solo');
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
.row_no_margin {
	margin-bottom: 0;
}

#issueForm {
	margin-top: 1em;
}

</style>