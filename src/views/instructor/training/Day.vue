<template>
	<div class="card">
		<div class="card-content">
			<div class="card-title">Training Requests for {{formatDate(date)}}</div>
		</div>
		<div class="loading_container" v-if="requests === null">
			<Spinner />
		</div>
		<div v-else-if="requests.length === 0" class="no_requests">
			There are no training requests for {{formatDate(date)}}.
		</div>
		<div class="requests_wrapper" v-else>
			<table class="requests_list striped">
				<thead class="request_list_head">
					<tr>
						<th>Student</th>
						<th>Milestone</th>
						<th>Start</th>
						<th>End</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="requests_list_row">
					<tr v-for="(request, i) in requests" :key="request._id">
						<td>{{request.student.fname + ' ' + request.student.lname}} <span v-if="request.student.vis === true">(VC)</span></td>
						<td>{{request.milestone.name}}</td>
						<td>{{dtLong(request.startTime)}}</td>
						<td>{{dtLong(request.endTime)}}</td>
						<td class="options">
							<a :href="`#modal_request_${i}`" data-position="top" data-tooltip="View Request" class="tooltipped modal-trigger">
								<i class="material-icons" @click="changeTimes(i)">search</i>
							</a>
						</td>
						<div :id="`modal_request_${i}`" class="modal modal_request">
							<div class="modal-content">
								<div class="modal_title">Training Request from {{request.student.fname + ' ' + request.student.lname}}</div>
								<div class="request">
									<div class="row row_no_margin" id="request">
										<div class="input-field col s12 l6">
											<p id="student">{{request.student.fname + ' ' + request.student.lname}} <span v-if="request.student.vis === true">(VC)</span></p>
											<label for="student" class="active">Student</label>
										</div>
										<div class="input-field col s12 l6">
											<p id="cid">{{request.milestone.name}} ({{request.milestone.code}})</p>
											<label for="cid" class="active">Milestone</label>
										</div>
										<div class="input-field col s12 l6">
											<div id="start_time">
												<div class="date">{{formatHtmlDate(request.startTime)}}</div>
												<div class="controls">
													<div><i class="material-icons" @click="increaseTime('start', i)">arrow_drop_up</i></div>
													<div><i class="material-icons" @click="decreaseTime('start', i)">arrow_drop_down</i></div>
												</div>
											</div>
											<label for="start_time" class="active">Start Time (Zulu)</label>
										</div>
										<div class="input-field col s12 l6">
											<div id="end_time">
												<div class="date">{{formatHtmlDate(request.endTime)}}</div>
												<div class="controls">
													<div><i class="material-icons" @click="increaseTime('end', i)">arrow_drop_up</i></div>
													<div><i class="material-icons" @click="decreaseTime('end', i)">arrow_drop_down</i></div>
												</div>
											</div>
											<label for="end_time" class="active">End Time (Zulu) </label>
										</div>
										<div class="input-field remarks_wrapper col s12">
											<p id="remarks">{{request.remarks ? request.remarks : '—'}}</p>
											<label for="remarks" class="active">Remarks</label>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="takeSession(i, request._id)">Take</a>
								<a href="#!" class="waves-effect btn-flat modal-close">Cancel</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'TrainingRequestsDay',
	data() {
		return {
			date: '',
			times: {},
			requests: null
		};
	},
	async mounted() {
		await this.verifyRoute();
		await this.getRequests();
		this.setTitle(`Training Requests for ${this.formatDate(this.date)}`);
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getRequests() {
			try {
				const {data} = await zabApi.get(`/training/request/${this.$route.params.date}`);
				this.requests = data.data;
			} catch(e) {
				console.log(e);
			}
		},
		async takeSession(i, id) {
			try {
				const {data} = await zabApi.post(`/training/request/take/${id}`, {
					startTime: this.requests[i].startTime,
					endTime: this.requests[i].endTime,
					instructor: this.$store.state.user.user.data._id
				});
				if(data.ret_det.code === 200) {
					this.toastSuccess('Training request successfully taken');
					this.$router.push('/ins/training/requests');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
			
		},
		verifyRoute() {
			const d = this.$route.params.date;
			if(/^\d+$/.test(d) === false) {
				this.$router.push('/ins/training/requests');
			} else {
				this.date = `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
			}
		},
		formatDate(value) {
			const d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',});
		},
		formatHtmlDate(value) {
			const d = new Date(value).toISOString();
			return d.replace('T', ' ').slice(0,16);
		},
		changeTimes(i) {
			this.times = {
				startTime: this.requests[i].startTime,
				endTime: this.requests[i].endTime
			};
		},
		increaseTime(type, i) {
			if(type === 'start'  && this.requests[i].startTime !== this.times.endTime && new Date(this.requests[i].startTime) < new Date(this.requests[i].endTime)) {
				let d = new Date(this.requests[i].startTime);
				d.setUTCMinutes(d.getUTCMinutes() + 15);
				this.requests[i].startTime = d.toISOString();
			} else if(type === 'end' && this.requests[i].endTime !== this.times.endTime && new Date(this.requests[i].endTime) >= new Date(this.requests[i].startTime)) {
				let d = new Date(this.requests[i].endTime);
				d.setUTCMinutes(d.getUTCMinutes() + 15);
				this.requests[i].endTime = d.toISOString();
			}
		},
		decreaseTime(type, i) {
			if(type === 'start'  && this.requests[i].startTime !== this.times.startTime && new Date(this.requests[i].startTime) <= new Date(this.requests[i].endTime)) {
				let d = new Date(this.requests[i].startTime);
				d.setUTCMinutes(d.getUTCMinutes() - 15);
				this.requests[i].startTime = d.toISOString();
			} else if(type === 'end' && this.requests[i].endTime !== this.times.startTime && new Date(this.requests[i].endTime) > new Date(this.requests[i].startTime)) {
				let d = new Date(this.requests[i].endTime);
				d.setUTCMinutes(d.getUTCMinutes() - 15);
				this.requests[i].endTime = d.toISOString();
			}
		}
	}
};
</script>

<style scoped lang="scss">
.no_requests {
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

.requests_wrapper {
	overflow: auto;
	margin-top: 1em;
}

.modal_title {
	font-size: 1.8em;
	margin-bottom: .5em;
}

.modal_request {
	min-width: 300px;
	width: 35%;
}

.request {
	.remarks_wrapper {
		margin-top: 2.5em;
	}

	#remarks {
		font-family: inherit;
		white-space: pre-wrap;
		overflow: hidden;
		width: 100%;
	}

	#start_time, #end_time {

		.date {
			margin-top: .5em;
			height: 2.3rem;
			padding-top: .3em;
			border-bottom: 1px solid #9E9E9E;
			font-size: 16px;
			line-height: 1.15;
		}

		.controls {
			height: 10px;
			margin-top: -2.4em;
			margin-left: 92%;

			div:not(:first-child) {
				margin-top: 0px;
				padding-bottom: 5px;
			}

			div {
				cursor: pointer;
				user-select: none;
				height: 15px;
				margin-top: -10px;
			}
		}
	}

	.row {
		.input-field p {
			line-break: anywhere;
			margin: .33em 0 0 0;
		}
	}
}

@media only screen and (max-width: 992px) {
	#start_time {
		height: 2rem;
	}
}

</style>