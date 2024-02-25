<template>
	<div class="card">
		<div v-if="loading">
			<div class="loading_container">
				<Spinner />
			</div>
		</div>
		<div v-else>
			<div class="card-content">
				<div>
					<div class="row">
						<div class="col s5 m4 l3">
							<div class="controller_image">
								<img :src="`https://zabartcc.sfo3.digitaloceanspaces.com/avatars/${controller.avatar || `${controller.cid}-default.png`}`" alt="" height="170" width="170">
							</div>
						</div>
						<div class="col s7 m8 l9">
							<div class="controller_name">
								{{ controller.fname }} {{ controller.lname }} ({{ controller.oi }})
								<span v-if="controller.absence.length" class="controller_loa">LOA</span>
							</div>
							<div class="controller_rating">{{controller.ratingLong}}</div>
						</div>
						<div class="col s12 m8 l9">
							<div class="controller_certs">
								<span v-for="role in controller.roles" :class="`cert cert_${role.class}`" :key="role.id" :data-tooltip="role.name" data-position="top">
									{{ role.name }}
								</span>
								<div v-if="controller.certifications.length" class="title">Certifications</div>
								<span v-for="cert in reduceControllerCerts(controller.certifications)" :class="`cert cert_${cert.class}`" :key="cert.id">
									{{ cert.name }}
								</span>
							</div>
						</div>
					</div>
					<div class="card z-depth-2" v-if="controller.bio">
						<div class="card-content">
							<p class="bio">{{ controller.bio }}</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="session_table_wrap">
					<table class="striped responsive-table centered">
						<thead>
							<tr>
								<th></th>
								<th>DEL</th>
								<th>GND</th>
								<th>TWR</th>
								<th>APP</th>
								<th>CTR</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="month in stats.months" :key="month" class="hover">
								<td>{{ month}}</td>
								<td>{{ sec2hm(stats[month].del) }}</td>
								<td>{{ sec2hm(stats[month].gnd) }}</td>
								<td>{{ sec2hm(stats[month].twr) }}</td>
								<td>{{ sec2hm(stats[month].app) }}</td>
								<td>{{ sec2hm(stats[month].ctr) }}</td>
								<td>{{ sec2hm(totalTime(stats[month])) || '0:00' }}</td>
							</tr>
							<tr class="hover">
								<td>>1 Year</td>
								<td>{{ sec2hm(stats.gtyear.del) }}</td>
								<td>{{ sec2hm(stats.gtyear.gnd) }}</td>
								<td>{{ sec2hm(stats.gtyear.twr) }}</td>
								<td>{{ sec2hm(stats.gtyear.app) }}</td>
								<td>{{ sec2hm(stats.gtyear.ctr) }}</td>
								<td>{{ sec2hm(totalTime(stats.gtyear)) || '0:00' }}</td>
							</tr>
							<tr>
								<td>Total</td>
								<td>{{ sec2hm(stats.total.del) || '0:00' }}</td>
								<td>{{ sec2hm(stats.total.gnd) || '0:00' }}</td>
								<td>{{ sec2hm(stats.total.twr) || '0:00' }}</td>
								<td>{{ sec2hm(stats.total.app) || '0:00' }}</td>
								<td>{{ sec2hm(stats.total.ctr) || '0:00' }}</td>
								<td>{{ sec2hm(totalTime(stats.total)) || '0:00' }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="card-content">
					<div>
						<strong>Total Sessions:</strong> {{ stats.sessionCount }}
					</div>
					<div>
						<strong>Average Session Length:</strong> {{ sec2hm(stats.sessionAvg) || '0:00' }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	name: 'Controller Profile',
	data() {
		return {
			controller: null,
			stats: null,
			loading: true
		};
	},
	async mounted() {
		await this.getController();

		this.setTitle(`${this.controller.fname} ${this.controller.lname} | Controller Profile`);
	},
	methods: {
		async getController() {
			this.loading = true;
			const { data } = await zabApi.get(`/controller/${this.$route.params.cid}`);
			if(data.ret_det.code === 200) {
				this.controller = data.data;
				const {data: statsData} = await zabApi.get(`/controller/stats/${this.$route.params.cid}`);
				this.stats = statsData.data;
			}
			if(!this.controller || !this.controller.isMem) this.$router.push('/404');
			this.loading = false;
		},
		reduceControllerCerts(certs) {
			if(!certs) return [];
			const hasCerts = certs.map((cert) => cert.code);
			let certsToShow = [];
			certs.forEach(cert => {
				if(cert.class === "tier-one" || cert.class === "tier-two") {
					certsToShow.push(cert);
				}
			});
			
			certsToShow = certsToShow.sort((a, b) => a.class.localeCompare(b.class, 'en', { numeric: true }) || a.order - b.order)
			return certsToShow;
		},
		sec2hm(secs) {
			if(!secs) return null;
			const hours = Math.floor(secs / 3600);
			const minutes = `0${Math.round((secs / 60) % 60)}`.slice(-2);
			return `${hours}:${minutes}`;
		},
		totalTime(month) {
			return Object.values(month).reduce((acc, cv) => acc + cv);
		}
	},
	watch: {
		'$route.params.cid': async function() { // get new data if route remains the same but parameter changes
			await this.getController();
		}
	}
};
</script>

<style scoped lang="scss">
.controller_image {
	max-width: 256px;
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
	margin-top: .5em;
}

.cert {
	display: inline-block;
	padding: 0.25rem 0.4rem;
	color: #fff;
	font-size: 0.85rem;
	margin: 2px;
	user-select: none;

	&+.title {
		margin-top: 1em;
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
	
	&.cert_tier-one {
		background-color: $secondary-color-dark;
	}

	&.cert_tier-two {
		background: $secondary-color-light;
	}
}

.title {
	color: #9e9e9e;
	font-size: .8rem;
}

.bio {
	white-space: pre-wrap;
}

.user_biography {
	margin-top: .75em;
}

.session_table_wrap {
	@media screen and (min-width: 993px) {
		th:last-of-type, td:last-of-type {
			border-left: 1px solid #000;
		}
		tbody tr:last-of-type {
			border-top: 1px solid #000;
		}
	}
	tbody td:first-of-type {
		font-weight: 700;
	}
}

.controller_loa {
	background: $secondary-color-dark;
	color: #fff;
	font-weight: 400;
	padding: 0.2rem 0.4rem;
	font-size: 1rem;
	margin-left: .25em;
	user-select: none;
}

.hover {
	transition: .3s ease;

	&:hover {
		background: #eaeaea;
	}
}

.not_found {
	h5 {
		margin: .5em 0;
	}
}
</style>