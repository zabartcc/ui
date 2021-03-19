<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Visitor Applications</span>
		</div>
		<div class="card-content loading" v-if="applications === null">
			<Spinner />
		</div>
		<p class="no_visit" v-else-if="applications && applications.length === 0">There are no new visitor applications.</p>
		<div class="table_wrapper" v-else>
			<table class="striped">
				<thead class="certs_list_head">
					<tr>
						<th>Applicant</th>
						<th>Rating</th>
						<th>Home ARTCC</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="certs_list_row">
					<tr v-for="app in applications" :key="app.cid">
						<td>{{app.fname}} {{app.lname}}</td>
						<td>{{app.rating}}</td>
						<td>{{app.home}}</td>
						<td class="options"><a :href="`#modal_${app.cid}`" class="modal-trigger"><i class="material-icons">search</i></a></td>
						<div :id="`modal_${app.cid}`" class="modal modal_visit">
							<div class="modal-content">
								<div class="modal_title">Visiting Application</div>
								<div class="row row_no_margin">
									<div class="input-field col s6">
										<p id="name">{{app.fname + ' ' + app.lname}}</p>
										<label for="name" class="active">Applicant Name</label>
									</div>
									<div class="input-field col s6">
										<p id="email">{{app.email}}</p>
										<label for="email" class="active">Applicant Email</label>
									</div>
									<div class="input-field col s6">
										<p id="cid">{{app.cid}}</p>
										<label for="cid" class="active">Applicant CID</label>
									</div>
									<div class="input-field col s6">
										<p id="rating">{{app.rating}}</p>
										<label for="rating" class="active">Applicant Rating</label>
									</div>
									<div class="input-field col s6">
										<p id="home">{{app.home}}</p>
										<label for="home" class="active">Applicant Home ARTCC</label>
									</div>
									<div class="input-field col s6">
										<p id="submission_date">{{dtLong(app.createdAt)}}</p>
										<label for="submission_date" class="active">Submission Date</label>
									</div>
									<div class="input-field col s12">
										<p id="join_reason">{{app.reason}}</p>
										<label for="join_reason" class="active">Why would you like to visit ZAB?</label>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="approveVisitor(app.cid)">Approve</a>
								<a href="#!" class="waves-effect btn-flat" @click="openRejectModal(app.cid)">Reject</a>
							</div>
						</div>
						<div :id="`modal_reject_${app.cid}`" class="modal modal_visit">
							<div class="modal-content">
								<div class="modal_title">Reject Visiting Application</div>
								<p>Are you sure you want to reject the visiting application from <strong>{{app.fname + ' ' + app.lname}}</strong>?  You must provide a reason for rejection below.</p>
								<div class="row row_no_margin">
									<div class="input-field col s12">
										<input :id="`reason_${app.cid}`" :name="`reason_${app.cid}`" v-model="reason[app.cid]" />
										<label :for="`reason_${app.cid}`" class="active">Reason</label>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="rejectVisitor(app.cid)">Reject</a>
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
import {zabApi, vatusaApiAuth} from '@/helpers/axios.js';

export default {
	name: 'VisitorApplications',
	title: 'Visitor Applications',
	data() {
		return {
			applications: null,
			reason: {}
		};
	},
	async mounted() {
		await this.getNewApplications();
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	methods: {
		async getNewApplications() {
			try {
				const {data} = await zabApi.get('/controller/visit');
				this.applications = data.data;
			} catch(e) {
				console.log(e);
			}
		},
		async approveVisitor(cid) {
			try {
				await zabApi.put(`/controller/visit/${cid}`);
				await vatusaApiAuth.post(`/facility/ZAB/roster/manageVisitor/${cid}`);
				this.toastSuccess('Visitor successfully added to roster');
				await this.getNewApplications();
			} catch(e) {
				console.log(e);
				this.toastError('Something went wrong, please try again');
			}
		},
		async rejectVisitor(cid) {
			try {
				console.log(this.reason[cid]);
				await zabApi.delete(`/controller/visit/${cid}`, {data: {
					reason: this.reason[cid]
				}});

				this.toastSuccess('Application successfully rejected');

				await this.getNewApplications();
				M.Modal.getInstance(document.querySelector(`#modal_reject_${cid}`)).close();
			} catch(e) {
				console.log(e);
				this.toastError('Something went wrong, please try again');
			}
		},
		openRejectModal(i) {
			M.Modal.getInstance(document.querySelector(`#modal_${i}`)).close();
			M.Modal.getInstance(document.querySelector(`#modal_reject_${i}`)).open();
		}
	}
};
</script>

<style scoped lang="scss">
.modal {
	min-width: 340px;
	width: 30%;
}

.modal_title {
	font-size: 1.8em;
	margin-bottom: .5em;
}

.modal_feedback {
	min-width: 300px;
	width: 35%;
}

.no_visit {
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

#join_reason {
	font-family: inherit;
	white-space: pre-wrap;
	overflow: hidden;
	width: 100%;
}

.row {
	.input-field p, .input-field pre {
		margin: .33em 0 0 0;
		line-break: anywhere;
	}
}
</style>