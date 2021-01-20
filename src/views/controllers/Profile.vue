<template>
	<div class="card">
		<div class="card-content">
			<div class="loading_container" v-if="!controller">
				<Spinner />
			</div>
			<div class="row" v-else>
				<div class="col s5 m4 l3">
					<div class="controller_image">
						<img :src="controller.image ?? require('@/assets/images/blank.png')" />
					</div>
				</div>
				<div class="col s7 m8 l9">
					<div class="controller_name">{{controller.fname}} {{controller.lname}} ({{controller.oi}})</div>
					<div class="controller_rating">{{controller.ratingLong}}</div>
				</div>
				<div class="col s12 m8 l9">
					<div class="controller_certs">
						<div class="title">Roles &amp; Certifications</div>
						<span v-for="role in controller.roles" :class="`cert cert_${role.class}`" :key="role.id" :data-tooltip="role.name" data-position="top">
							{{role.name}}
						</span>
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
import {ControllerMixin} from '@/mixins/ControllerMixin.js';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'Controller Profile',
	data() {
		return {
			controller: null
		};
	},
	mixins: [ControllerMixin],
	components: {
		Spinner
	},
	async mounted() {
		await this.getController();
	},
	methods: {
		async getController() {
			this.controller = await this.getControllerMixin(this.$route.params.cid);
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