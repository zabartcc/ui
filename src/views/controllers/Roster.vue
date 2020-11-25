<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Home Controllers</span>
		</div>
		<table class="controller_list striped">
			<thead class="controller_list_head">
				<tr>
					<th class="name">Controller</th>
					<th class="certs">Certifications</th>
				</tr>
			</thead>
			<tbody class="controller_list_row">
				<tr v-for="controller in controllers.home" :key="controller.cid">
					<td class="name">
						<router-link :to="`/controllers/${controller.cid}`">
							{{controller.fname}} {{controller.lname}} ({{controller.oi}})
						</router-link><br />
						<div class="rating">
							{{controller.ratingLong}}
						</div>
					</td>
					<td class="certs">
						<span v-for="role in controller.roles" :class="`tooltipped cert cert_${role.class}`" :key="role.id" :data-tooltip="role.name" data-position="top">
							{{role.code.toUpperCase()}}
						</span>
						<span v-for="cert in reduceControllerCerts(controller.certifications)" :class="`cert cert_${cert.class}`" :key="cert.id">
							{{cert.name}}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Visiting Controllers</span>
		</div>
		<table class="controller_list striped">
			<thead class="controller_list_head">
				<tr>
					<th class="name">Controller</th>
					<th class="certs">Certifications</th>
				</tr>
			</thead>
			<tbody class="controller_list_row">
				<tr v-for="controller in controllers.visiting" :key="controller.cid">
					<td class="name">
						<router-link :to="`/controllers/${controller.cid}`">
							{{controller.fname}} {{controller.lname}} ({{controller.oi}})
						</router-link><br />
						<div class="rating">
							{{controller.ratingLong}}
						</div>
					</td>
					<td class="certs">
						<span v-for="role in controller.roles" :class="`tooltipped cert cert_${role.class}`" :key="role.id" :data-tooltip="role.name" data-position="top">
							{{role.code.toUpperCase()}}
						</span>
						<span v-for="cert in reduceControllerCerts(controller.certifications)" :class="`cert cert_${cert.class}`" :key="cert.id">
							{{cert.name}}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { ControllerMixin } from '@/mixins/ControllerMixin.js';

export default {
	name: 'Controller Roster',
	data() {
		return {
			controllers: {
				home: [],
				visiting: []
			}
		};
	},
	mixins: [ControllerMixin],
	async mounted() {
		await this.getControllers();
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getControllers() {
			this.controllers = await this.getControllersMixin();
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
.controller_list {
	padding: 10px;
}
.controller_list_head {
	position: relative;
	font-weight: 700;
	border-bottom: 1px solid #666;
}

.controller_list_row {
	tr {
		transition: background-color .3s ease;
		&:hover {
			background: #eaeaea;
		}
	}

	div {
		padding: 0.5rem 1rem;
	}
}

tr th {
	text-align: left!important;
}

td {
	padding: .25em 1em!important;
}

.name {
	width: 30%;
}

.name a {
	font-weight: 700;
}

.name .rating {
	font-weight: 400;
	margin: -10px 0 0 -15px;
	padding-bottom: 0!important;
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

.tooltipped {
	cursor: pointer;
}
</style>