<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Issue Solo Certification</span>
			<div class="spinner_wrapper" v-if="!controllers">
				<Spinner />
			</div>
			<div class="row row_no_margin" v-else>
				<div class="col s12 l6 push-l6 card_desc">
					<p>Solo certifications may be issued to students who have demonstrated sufficient competency on the position they are receiving a solo certification for. <br /><br />Solo certifications must be issued in accordance with the training syllabus and are automatically submitted to VATUSA. <br /><br />Please note that solo certifications may not extend beyond thirty days in length.</p>
				</div>
				<form class="col s12 l6 pull-l6" @submit.prevent=submitCert>
					<div class="row row_no_margin">
						<div class="col s12 input-field">
							<select v-model="form.cid" required>
								<option value="" disabled selected>Select a controller</option>
								<option v-for="controller in controllers" :value="controller.cid" :key="controller.cid">{{controller.fname}} {{controller.lname}}</option>
							</select>
							<label>Controller</label>
						</div>
						<div class="col s12 input-field">
							<input id="position" type="text" minlength=7 maxlength=7 class="validate" placeholder="PHX_APP" v-model="form.position" required>
							<label for="position" class="active">Position</label>
						</div>
						<div class="col s12 input-field">
							<input id="exp" type="text" class="validate datepicker" placeholder="Pick a date" v-model="form.expDate" required>
							<label for="exp" class="active">Expiration  Date</label>
						</div>
						<div class="col s12 input-field">
							<input type="submit" class="btn" value="Submit" />
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import {vatusaApiAuth, zabApi} from '@/helpers/axios.js';

export default {
	name: 'NewSoloCert',
	title: 'New Solo Certification',
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
	async mounted() {
		await this.getControllers();
		const today = new Date(new Date().toUTCString());
		const future = new Date(new Date().toUTCString());
		
		M.FormSelect.init(document.querySelectorAll('select'), {});
		M.Datepicker.init(document.querySelectorAll('.datepicker'), {
			autoClose: true,
			format: 'yyyy-mm-dd',
			minDate: today,
			maxDate: new Date(future.setDate(future.getDate() + 30)),
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
			this.controllers = data.data.filter(c => {
				return c.rating > 2 && c.vis == false;
			});
		},
		async submitCert() {
			try {
				const formData = new FormData();
				formData.append('cid', this.form.cid);
				formData.append('position', this.form.position);
				formData.append('expDate', this.form.expDate);
				// await vatusaApiAuth.post('/solo', formData); // BETADISABLE

				this.toastSuccess('Solo cert successfully added');

				this.$router.push('/ins/solo');
			} catch(e) {
				this.toastError(e);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.card_desc {
	margin-bottom: 1em;
}
</style>