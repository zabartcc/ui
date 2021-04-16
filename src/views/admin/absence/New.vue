<template>
	<div class="card home_intro">
		<div class="card-content">
			<span class="card-title">Grant Leave of Absence</span>
			<div class="loading_container" v-if="!controllers">
				<Spinner />
			</div>
			<form class="loa_form row row_no_margin"  @submit.prevent=submitForm v-else>
				<div class="input-field col s12 m6">
					<select class="materialize-select" v-model="form.controller" required>
						<option value="" disabled selected>Select a controller</option>
						<option v-for="controller in controllers" :value="controller.cid" :key="controller.cid">{{controller.fname}} {{controller.lname}}</option>
					</select>
					<label>Controller</label>
				</div>
				<div class="input-field col s12 m6">
						<input id="expiration_date" type="text" class="datepicker" ref="expirationDate" required>
						<label for="expiration_date">Expiration Date (Zulu)</label>
					</div>
				<div class="input-field col s12">
					<textarea class="materialize-textarea" id="reason" v-model="form.reason" data-length="2000" required></textarea>
					<label for="reason">Reason</label>
				</div>
				<div class="input-field col s12">
					<input type="submit" class="btn right" value="Grant" />
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import {zabApi} from '@/helpers/axios.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default {
	name: 'Absence',
	title: 'Grant Leave of Absence',
	data() {
		return {
			form: {
				controller: 0,
				reason: ''
			},
			controllers: null
		};
	},
	async mounted() {
		await this.getControllers();

		const today = new Date(new Date().toUTCString());
		flatpickr(this.$refs.expirationDate, {
			enableTime: false,
			time_24hr: true,
			minDate: today,
			disableMobile: true,
			dateFormat: 'Y-m-d',
			altFormat: 'Y-m-d',
			altInput: true,
		});

		M.FormSelect.init(document.querySelectorAll('.materialize-select'), {});
		M.CharacterCounter.init(document.querySelectorAll('textarea'), {});
	},
	methods: {
		async getControllers() {
			const {data} = await zabApi.get('/feedback/controllers');
			this.controllers = data.data;
		},
		async submitForm() {
			try {
				const {data} = await zabApi.post('/controller/absence', {
					...this.form,
					expirationDate: `${this.$refs.expirationDate.value}T00:00:00.000Z`
				});

				console.log(this.$refs.expirationDate.value);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Leave of Absence granted');

					this.$router.push('/admin/absence');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		}
	}
};
</script>