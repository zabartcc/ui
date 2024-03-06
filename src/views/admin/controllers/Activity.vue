<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Controller Activity Report</span>
			<p>Showing controller activity since {{dLong(chkDate)}}</p>
		</div>
		<div class="table_wrapper">
			<table class="medium striped" v-if="report">
				<thead>
					<th>Active?</th>
					<th @click="sort('lname')">
						Controller
						<div class="right">
							<i class="material-icons" v-if="sortBy !== 'lname'">unfold_more</i>
							<i class="material-icons active" v-else-if="sortBy === 'lname' && descending">arrow_drop_down</i>
							<i class="material-icons active" v-else-if="sortBy === 'lname' && !descending">arrow_drop_up</i>
						</div>
					</th>
					<th @click="sort('rating')">
						Rating
						<div class="right">
							<i class="material-icons" v-if="sortBy !== 'rating'">unfold_more</i>
							<i class="material-icons active" v-else-if="sortBy === 'rating' && descending">arrow_drop_down</i>
							<i class="material-icons active" v-else-if="sortBy === 'rating' && !descending">arrow_drop_up</i>
						</div>
					</th>
					<th @click="sort('totalTime')">
						Time
						<div class="right">
							<i class="material-icons" v-if="sortBy !== 'totalTime'">unfold_more</i>
							<i class="material-icons active" v-else-if="sortBy === 'totalTime' && descending">arrow_drop_down</i>
							<i class="material-icons active" v-else-if="sortBy === 'totalTime' && !descending">arrow_drop_up</i>
						</div>
					</th>
					<th @click="sort('joinDate')">
						Join Date
						<div class="right">
							<i class="material-icons" v-if="sortBy !== 'joinDate'">unfold_more</i>
							<i class="material-icons active" v-else-if="sortBy === 'joinDate' && descending">arrow_drop_down</i>
							<i class="material-icons active" v-else-if="sortBy === 'joinDate' && !descending">arrow_drop_up</i>
						</div>
					</th>
					<th class="options">Options</th>
				</thead>
				<tbody>
					<tr v-for="controller of sortedArray" :class="[(controller.tooLow)?'too_low':'',(controller.protected)?'protected':'']" :key="controller.cid">
						<td>
							<i class="material-icons green-text" v-if="!controller.tooLow || controller.protected">check</i>
							<i class="material-icons red-text text-darken-1" v-else>close</i>
						</td>
						<td>
							<i class="type_controller material-icons right">{{controller.vis?'work':'home'}}</i>
							<router-link :to="`/controllers/${controller.cid}`" class="controller_name">
								<span class="bold">{{controller.fname}} {{controller.lname}}</span>
								<span v-if="controller.absence && controller.absence.length" class="controller_loa hide-on-med-and-down">LOA</span>
								<div class="controller_info">
									<h6>Controller Details</h6>
									<p class="bold">{{controller.fname}} {{controller.lname}} ({{controller.oi}})</p>
									<p class="light">{{controller.ratingLong}}</p>
									<div class="certifications" v-if="controller.rating > 1">
										<div class="title">Certifications</div>
										<span v-for="cert in reduceControllerCerts(controller.certifications)" :class="`cert cert_${cert.class}`" :key="cert.id">
											{{cert.name}}
										</span>
										<span v-if="controller.certifications.length === 0">
											—
										</span>
									</div>
									<div class="certifications training_request" v-if="controller.rating >= 0">
										Controller has made <b>{{controller.totalRequests}}</b> training request(s) in the last 90 days
									</div>
								</div>
							</router-link>
							
						</td>
						<td>{{controller.ratingShort}}</td>
						<td>{{secondsToHms(controller.totalTime)}}</td>
						<td>{{dLong(new Date(controller.joinDate))}}</td>
						<td class="options">
							<a :href="`#modal_delete_${controller.cid}`" data-position="top" data-tooltip="Remove Controller" class="tooltipped modal-trigger"><i class="material-icons red-text text-darken-2">delete</i></a>
						</td>
						<div :id="`modal_delete_${controller.cid}`" class="modal modal_delete">
							<div class="modal-content">
								<h4>Remove Controller?</h4>
								<p>This will remove <b>{{controller.fname}} {{controller.lname}} | {{controller.cid}}</b> from the Albuquerque ARTCC. You must state a reason for removal below. Please note that this will delete the controller from both the website and the VATUSA facility roster.</p>
								<textarea class="materialize-textarea" placeholder="Reason for removal" v-model="reason" required></textarea>
							</div>
							<div class="modal-footer">
								<a href="#!" @click="removeController(controller.cid)" class="btn waves-effect">Remove</a>
								<a href="#!" class="btn-flat waves-effect modal-close">Cancel</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
			<div class="loading_container" v-else>
				<Spinner />
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	data() {
		return {
			report: null,
			chkDate: null,
			reason: '',
			sortBy: null,
			descending: true
		};
	},
	async mounted() {
		await this.getActivity();

		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getActivity() {
			const d = new Date();
			this.chkDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - 91));
			const {data: reportData} = await zabApi.get('/stats/activity');
			this.report = reportData.data;
		},
		async removeController(cid) {
			try {
				this.toastInfo('Removing controller...');
				const {data} = await zabApi.delete(`/controller/${cid}`, {
					data: {
						reason: this.reason
					}
				});

				this.reason = '';

				if(data.ret_det.code === 200) {
					this.toastSuccess('Controller removed from roster');

					this.$nextTick(() => {
						M.Modal.getInstance(document.querySelector('.modal_delete')).close();
					});
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		secondsToHms(secs){
			const days = Math.floor(secs / 86400);
			const remainderSeconds = secs % 86400;
			const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19);
			return hms.replace(/^(\d+)/, h => `${+h + days * 24}`.padStart(2, '0'));
		},
		sec2hms(secs) {
			if(!secs) return '00:00:00';
			let hours = Math.floor(secs / 3600);
			if(hours < 10) {
				hours = `00${hours}`.slice(-2);
			}
			const minutes = `0${Math.round((secs / 60) % 60)}`.slice(-2);
			const seconds = `0${secs % 60}`.slice(-2);
			return `${hours}:${minutes}:${seconds}`;
		},
		reduceControllerCerts(certs) {
			if(!certs) return [];
			const hasCerts = certs.map(cert => cert.code);
			let certsToShow = [];
			certs.forEach(cert => {
				if(cert.class === "tier-one" || cert.class === "tier-two") {
					certsToShow.push(cert);
				}
			});

			certsToShow = certsToShow.sort((a, b) => a.class.localeCompare(b.class, 'en', { numeric: true }) || a.order - b.order)
			return certsToShow;
		},
		sort(p) {
			if(p === this.sortBy) {
				this.descending = !this.descending;
			} else {
				this.sortBy = p;
				this.descending = true;
			}
		}
	},
	computed: {
		sortedArray() {
			let array = this.report;

			if(this.sortBy && this.descending) {
				array.sort((a, b) => (b[this.sortBy] > a[this.sortBy]) - (b[this.sortBy] < a[this.sortBy]));
			} else if(this.sortBy && !this.descending) {
				array.sort((a, b) => (a[this.sortBy] > b[this.sortBy]) - (a[this.sortBy] < b[this.sortBy]));
			}

			return array;
		}
	}
};
</script>

<style lang="scss" scoped>
.protected {
	background: rgba($accent-color, 0.25);
}

.bold {
	font-weight: 600;
}

.table_wrapper {
	overflow: auto;

	table {
		min-width: 700px;

		.type_controller {
			color: rgba(0, 0, 0, 0.87);
			margin-right: -14px;
		}

		th {
			user-select: none;
			cursor: pointer;

			i {
				font-size: 17px;
				color: #a8a8a8;
				position: absolute;
				margin-top: 4px;

				&.active {
					color: #a8a8a8;
					font-size: 24px;
					margin-top: 0;
					margin-left: -3px;
				}
			}
		}
	}
}

.controller_name {
	&:hover {
		.controller_info {
			opacity: 1;
		}
	}
}

.controller_info {
	position: absolute;
	margin-top: 15px;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.3s;
	width: 300px;
	z-index: 500;
	background: #fff;
	box-shadow: 0px 0px 10px 0px rgba(#000, 0.5);

	&::before {
		left: 10%;
		transform: translateX(-10%);
		content: "";
		pointer-events: none;
		display: inline-block;
		position: absolute;
		bottom: 100%;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 0 10px 10px 10px;
		border-color: transparent transparent #122049 transparent;
	}

	h6 {
		background: $primary-color;
		padding: 10px;
		color: #fff;
		font-weight: 300;
		margin: 0;
	}

	p {
		padding: 0 .75em;
		margin: 0;

		&.bold {
			padding-top: .5em;
		}

		&.light {
			font-weight: 300;
			margin-top: -5px;
			color: #000;
		}
	}

	.certifications {
		padding: .5em .75em .75em .75em;
	}

	.training_request {
		color: #000;
		font-size: .875rem;
	}

	.cert {
		display: inline-block;
		padding: 0.125rem 0.25rem;
		color: #fff;
		font-size: 0.80rem;
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
}
</style>