<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Edit Controller {{ controller ? ` – ${controller.fname} ${controller.lname}` : '' }}</span>
			<div class="loading_container" v-if="!controller">
				<Spinner />
			</div>
			<form id="update_controller" @submit.prevent="updateController" v-else>
				<div class="row row_no_margin">
					<div class="input-field col s6">
						<input id="first_name" type="text" :value="form.fname" disabled>
						<label for="first_name" class="active">First Name</label>
					</div>
					<div class="input-field col s6">
						<input id="last_name" type="text" :value="form.lname" disabled>
						<label for="last_name" class="active">Last Name</label>
					</div>
					<div class="input-field col s6">
						<input id="cid" type="text" :value="controller.cid" disabled>
						<label for="cid" class="active">CID</label>
					</div>
					<div class="input-field col s6">
						<input id="rating" type="text" :value="controller.ratingLong" disabled>
						<label for="rating" class="active">Rating</label>
					</div>
					<div class="input-field col s6">
						<input id="email" type="email" :value="form.email" disabled>
						<label for="email" class="active">Email</label>
					</div>
					<div class="input-field col s6">
						<input id="oi" type="text" :value="form.oi" maxlength="2" disabled>
						<label for="oi" class="active">Operating Initials</label>
					</div>
<div class="input-field col s5">
						<label for="certs" class="active">Endorsements</label>
						<div id="certs_container">
                            <span 
                                id="enroute" 
                                :class="{active: form.certs.enroute}" 
                                class="cert cert_major" 
                                @click="toggleCert">Center</span>
                            <span 
                                id="p50" 
                                :class="{active: form.certs.p50}" 
                                class="cert cert_major" 
                                @click="toggleCert">P50</span>
                            <span 
                                id="kphxtower" 
                                :class="{active: form.certs.kphxtower}" 
                                class="cert cert_major" 
                                @click="toggleCert">KPHX TWR</span>
							<span 
                                id="kphxground" 
                                :class="{active: form.certs.kphxground}" 
                                class="cert cert_major" 
                                @click="toggleCert">KPHX GND</span>
						</div>
						<div id="tier_one_explainer">
							<p class="endorsement_category_explainer">Tier One</p>
						</div>
					</div>
					<div class="input-field col s7">
						<div id="certs_container">
							<span 
								id="kabq" 
								:class="{active: form.certs.kabq}" 
								class="cert cert_minor m-1"
								style="margin-left: 0" 
								@click="toggleCert">KABQ</span>
							<span 
								id="kflg" 
								:class="{active: form.certs.kflg}" 
								class="cert cert_minor tier_two_button" 
								@click="toggleCert">KFLG</span>
							<span 
								id="kluf" 
								:class="{active: form.certs.kluf}" 
								class="cert cert_minor tier_two_button" 
								@click="toggleCert">KLUF</span>
							<span 
								id="ksaf" 
								:class="{active: form.certs.ksaf}" 
								class="cert cert_minor tier_two_button" 
								@click="toggleCert">KSAF</span>
						</div>
						<div id="tier_two_explainer">
							<p class="endorsement_category_explainer">Tier Two</p>
						</div>
					</div>
					<div class="input-field col s12">
						<label for="roles" class="active">Roles</label>
						<div id="roles_container">
							<span id="atm" class="cert cert_senior" :class="{active: form.roles.atm}">ATM</span>
							<span id="datm" class="cert cert_senior" :class="{active: form.roles.datm}">DATM</span>
							<span id="ta" class="cert cert_senior" :class="{active: form.roles.ta}">TA</span>
							<span id="ec" class="cert cert_junior" :class="{active: form.roles.ec}">EC</span>
							<span id="fe" class="cert cert_junior" :class="{active: form.roles.fe}">FE</span>
							<span id="wm" class="cert cert_junior" :class="{active: form.roles.wm}">WM</span>
							<span id="ins" class="cert cert_training" :class="{active: form.roles.ins}">INS</span>
							<span id="mtr" class="cert cert_training" :class="{active: form.roles.mtr}">MTR</span>
							<span id="vis" class="cert cert_training" :class="{active: form.vis}">VIS</span>
						</div>
					</div>
					<div class="input-field col s12">
						<button type="submit" class="btn right">Update</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	data() {
		return {
			controller: null,
			usedOi: [],
			oi: '',
			oiAvail: true,
			form: {
				fname: '',
				lname: '',
				email: '',
				oi: '',
				vis: false,
				certs: {
				},
				roles: {
					atm: false,
					datm: false,
					ta: false,
					ec: false,
					fe: false,
					wm: false,
					ins: false,
					mtr: false,
				},
			}
		};
	},
	async mounted() {
		await this.getController();
		this.setTitle(`Edit ${this.controller.fname + ' ' + this.controller.lname}`);
	},
	methods: {
		async getController() {
			const { data } = await zabApi.get(`/controller/${this.$route.params.cid}`);
			this.controller = data.data;
			this.form = {
				...this.form,
				fname: this.controller.fname,
				lname: this.controller.lname,
				email: this.controller.email,
				oi: this.controller.oi,
				vis: this.controller.vis,
			};
			
			this.controller.certifications.forEach((cert) => this.form.certs[cert.code] = true);
			this.controller.roles.forEach((role) => this.form.roles[role.code] = true);
			this.usedOi = (await zabApi.get(`/controller/oi`)).data.data;
		},
		toggleCert(e) {
			e.target.classList.toggle('active');
			this.form.certs[e.target.id] = e.target.classList.contains('active');
		},
		async updateController() {
			try {
				const { data } = await zabApi.put(`/controller/${this.controller.cid}`, {
					form: this.form
				});

				if(data.ret_det.code === 200) this.toastSuccess('Controller updated');
				else this.toastError(data.ret_det.message);
			} catch(e) {
				console.log(e);
			}
		}
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
	transition: background-color .3s ease;
	background: #eaeaea;
	color: $gray_medium;
	user-select: none;
	cursor: pointer;

	&.active {
		&.cert_senior {
			background: $cert_senior;
			color: #fff;
		}
	
		&.cert_junior {
			background: $cert_junior;
			color: #fff;
		}
	
		&.cert_training {
			background: $cert_training;
			color: #fff;
		}
		
		&.cert_center {
			background-color: $secondary-color-dark;
			color: #fff;
		}
	
		&.cert_major {
			background: $secondary-color;
			color: #fff;
		}
	
		&.cert_minor {
			background: $secondary-color-light;
			color: #fff;
		}
	}

}

#certs_container, #roles_container {
	margin-top: 5px;
}

#roles_container {
	.cert {
		pointer-events: none;
	}
}

.endorsement_category_explainer {
	text-style: italic;
	font-size: 10px;
}
</style>