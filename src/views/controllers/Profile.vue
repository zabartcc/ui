<template>
	<div class="card">
		<div class="card-content">
			<div class="loading_container" v-if="!controller">
				<Spinner />
			</div>
			<div class="row" v-else>
				<div class="col s5 m4 l3">
					<div class="controller_image">
						<img :src="require('@/assets/images/blank.png')" alt="">
					</div>
				</div>
				<div class="col s7 m8 l9">
					<div class="controller_name">{{controller.fname}} {{controller.lname}} ({{controller.oi}})</div>
					<div class="controller_rating">{{controller.ratingLong}}</div>
				</div>
				<div class="col s12 m8 l9">
					<div class="controller_certs">
						<div v-if="controller.roles.length" class="title">Staff Positions</div>
						<span v-for="role in controller.roles" :class="`cert cert_${role.class}`" :key="role.id" :data-tooltip="role.name" data-position="top">
							{{role.name}}
						</span>
						<div v-if="controller.certifications.length" class="title">Certifications</div>
						<span v-for="cert in reduceControllerCerts(controller.certifications)" :class="`cert cert_${cert.class}`" :key="cert.id">
							{{cert.name}}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'Controller Profile',
	data() {
		return {
			controller: null
		};
	},
	async mounted() {
		await this.getController();
		this.setTitle(`${this.controller.fname} ${this.controller.lname} | Controller Profile`);
	},
	methods: {
		async getController() {
			const {data} = await zabApi.get(`/controller/${this.$route.params.cid}`);
			this.controller = data.data;
		},
		reduceControllerCerts: certs => {
			if(!certs) return [];
			const hasCerts = certs.map(cert => cert.code);
			let certsToShow = [];
			certs.forEach(cert => {
				if(cert.class === "major" || cert.class === "center") {
					certsToShow.push(cert);
				} else {
					const certPos = cert.code.slice(-3);
					if(!hasCerts.includes(`p50${certPos}`)) {
						certsToShow.push(cert);
					}
				}
			});
			return certsToShow;
		}
	}
};
</script>

<style scoped lang="scss">
	.controller_image {
		img {
			width: 100%;
			height: auto;
			padding: .25rem;
			border: 1px solid lightgray;
		}
	}

	.controller_name {
		font-weight: 600;
		font-size: 1.5rem;
	}

	.controller_rating {
		font-weight: 300;
		font-size: 1.2rem;
		margin-top: -7px;
	}

	.controller_bio {
		margin-top: 15px;
		white-space: pre-wrap;
	}

	.controller_certs {
		margin-top: 1em;
	}

	.cert {
		display: inline-block;
		padding: 0.25rem 0.4rem;
		color: #fff;
		font-size: 0.85rem;
		margin: 2px;
		user-select: none;

		&+.title {
			margin-top: 1.5em;
		}

		&.cert_senior {
			background: $cert_senior;
		}

		&.cert_junior {
			background: $cert_junior;
		}

		&.cert_training {
			background: $cert_training;
		}
		
		&.cert_center {
			background-color: $secondary-color-dark;
		}

		&.cert_major {
			background: $secondary-color;
		}

		&.cert_minor {
			background: $secondary-color-light;
		}
	}

	.title {
		color: #9e9e9e;
		font-size: .8rem;
	}

</style>