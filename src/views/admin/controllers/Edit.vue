<template>
	<div v-if=controller class="card">
		<div class="card-content">
			<span class="card-title">Edit Controller - {{controller.fname}} {{controller.lname}}</span>
			<div class="row">
				<div class="input-field col s6">
					<input id="cid" type="text" :value="controller.cid" disabled>
					<label for="cid" class="active">Controller ID</label>
				</div>
				<div class="input-field col s6">
					<input id="rating" type="text" :value="controller.ratingLong" disabled>
					<label for="rating" class="active">Rating</label>
				</div>
				<div class="input-field col s6">
					<input id="first_name" type="text" :value="controller.fname">
					<label for="first_name" class="active">First Name</label>
				</div>
				<div class="input-field col s6">
					<input id="last_name" type="text" :value="controller.lname">
					<label for="last_name" class="active">Last Name</label>
				</div>
				<div class="input-field col s6">
					<input id="email" type="email" :value="controller.email">
					<label for="email" class="active">Email</label>
				</div>
				<div class="input-field col s6 input_oi">
					<input id="oi" type="text" v-model="oi" @input="checkOi($event)" maxlength="2">
					<label for="oi" class="active">Operating Initials</label>
					<div class="side_oi right">
						<i v-if="this.available == true" class="material-icons green-text">check_circle</i>
						<i v-else class="material-icons red-text">remove_circle</i>
					</div>
				</div>
				<div class="input-field col s12">
					<label for="certs" class="active">Certifications</label>
					<div id="certs_container">
						<span class="cert cert_null" :class="{cert_center: certs.includes('zab')}" id="cert_center" @click="giveCert">Albuquerque Center</span>
						<span class="cert cert_null" :class="{cert_major: certs.includes('p50app')}" id="cert_major" @click="giveCert">Major Approach</span>
						<span class="cert cert_null" :class="{cert_major: certs.includes('p50twr')}" id="cert_major" @click="giveCert">Major Tower</span>
						<span class="cert cert_null" :class="{cert_major: certs.includes('p50gnd')}" id="cert_major" @click="giveCert">Major Ground</span>
						<span class="cert cert_null" :class="{cert_minor: certs.includes('app')}" id="cert_minor" @click="giveCert">Minor Approach</span>
						<span class="cert cert_null" :class="{cert_minor: certs.includes('twr')}" id="cert_minor" @click="giveCert">Minor Tower</span>
						<span class="cert cert_null" :class="{cert_minor: certs.includes('gnd')}" id="cert_minor"  @click="giveCert">Minor Ground</span>
					</div>
				</div>
				<div class="input-field col s12">
					<label for="roles" class="active">Roles</label>
					<div id="roles_container">
						<span class="cert cert_null" :class="{cert_senior: roles.includes('atm')}" id="cert_senior" @click="giveCert">ATM</span>
						<span class="cert cert_null" :class="{cert_senior: roles.includes('datm')}" id="cert_senior" @click="giveCert">DATM</span>
						<span class="cert cert_null" :class="{cert_senior: roles.includes('ta')}" id="cert_senior" @click="giveCert">TA</span>
						<span class="cert cert_null" :class="{cert_junior: roles.includes('ec')}" id="cert_junior" @click="giveCert">EC</span>
						<span class="cert cert_null" :class="{cert_junior: roles.includes('fe')}" id="cert_junior" @click="giveCert">FE</span>
						<span class="cert cert_null" :class="{cert_junior: roles.includes('wm')}" id="cert_junior" @click="giveCert">WM</span>
						<span class="cert cert_null" :class="{cert_training: roles.includes('ins')}" id="cert_training"  @click="giveCert">INS</span>
						<span class="cert cert_null" :class="{cert_training: roles.includes('mtr')}" id="cert_training"  @click="giveCert">MTR</span>
					</div>
				</div>
				<div class="input-field col s12">
					<input type="submit" class="btn right" value="update" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ControllerMixin } from '@/mixins/ControllerMixin.js';
export default {
	data() {
		return {
			controller: null,
			usedOi: [],
			oi: "",
			available: true,
			certs: [],
			roles: []
		};
	},
	mixins: [ControllerMixin],
	methods: {
		async getController() {
			this.controller = await this.getControllerMixin(this.$route.params.cid);
			this.oi = this.controller.oi;
			this.controller.certifications.forEach((cert) => { this.certs.push(cert.code); });
			this.controller.roles.forEach((role) => { this.roles.push(role.code); });
			this.usedOi = await this.getUsedOiMixin();
		},
		checkOi() {
			if(this.oi == this.controller.oi) this.available = true;
			else if(this.usedOi.some(oi => oi.oi === this.oi) || this.oi.length != 2) this.available = false;
			else this.available = true;
		},
		giveCert(e) {
			var id = e.target.id;
			e.target.classList.toggle(id);
		}
	},
	mounted() {
		this.getController();
	}
};
</script>

<style scoped lang="scss">
.input_oi input {
	width: 85%;
}

.side_oi {
	margin-top: 20px;
	width: 15%;
	text-align: center;
}

.cert {
	display: inline-block;
	padding: 0.25rem 0.4rem;
	font-size: 0.85rem;
	margin: 2px;
	cursor: pointer;
	transition: background-color .3s ease;

	&.cert_null {
		background: $gray_mild;
		color: #9e9e9e;
	}

	&.cert_senior {
		background: $cert_senior!important;
		color: #fff!important;
	}

	&.cert_junior {
		background: $cert_junior!important;
		color: #fff!important;
	}

	&.cert_training {
		background: $cert_training!important;
		color: #fff!important;
	}
	
	&.cert_center {
		background-color: $secondary-color-dark!important;
		color: #fff!important;
	}

	&.cert_major {
		background: $secondary-color!important;
		color: #fff!important;
	}

	&.cert_minor {
		background: $secondary-color-light!important;
		color: #fff!important;
	}
}

#certs_container, #roles_container {
	margin-top: 5px;
}
</style>