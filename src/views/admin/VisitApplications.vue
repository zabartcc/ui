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
					<tr v-for="(app, i) in applications" :key="app.id">
						<td>{{app.fname + ' ' + app.lname}}</td>
						<td>{{app.rating}}</td>
						<td>{{app.home}}</td>
						<td class="options"><a :href="`#modal_${i}`" class="modal-trigger"><i class="material-icons">search</i></a></td>
						<div :id="`modal_${i}`" class="modal modal_visit">
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
										<p id="submission_date">{{formatDate(app.createdAt)}}</p>
										<label for="submission_date" class="active">Submission Date</label>
									</div>
									<div class="input-field col s12">
										<p id="join_reason">{{app.reason}}</p>
										<label for="join_reason" class="active">Why would you like to visit ZAB?</label>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="approveVisitor(app._id, app.cid)">Approve</a>
								<a href="#!" class="waves-effect btn-flat" @click="openRejectModal(i)">Reject</a>
							</div>
						</div>
						<div :id="`modal_reject_${i}`" class="modal modal_visit">
							<div class="modal-content">
								<div class="modal_title">Reject Visiting Application</div>
								<p>Are you sure you want to reject the visiting application from <strong>{{app.fname + ' ' + app.lname}}</strong>?  You must provide a reason for rejection below.</p>
								<div class="row row_no_margin">
									<div class="input-field col s12">
										<input id="reason" name="reason" v-model="reason" />
										<label for="reason" class="active">Reason</label>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="rejectVisitor(app._id, i)">Reject</a>
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
import Spinner from '@/components/Spinner.vue';
import {zabApi, vatusaApiAuth} from '@/helpers/axios.js';

export default {
	name: 'VisitorApplications',
	data() {
		return {
			applications: null,
			reason: ''
		};
	},
	components: {
		Spinner
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
				const {data} = await zabApi.get('/controller/visit/applications');
				this.applications = data;
			} catch(e) {
				console.log(e);
			}
		},
		async approveVisitor(id, cid) {
			try {
				await zabApi.put(`/controller/visit/applications/approve/${id}`);
				await vatusaApiAuth.post(`/facility/ZAB/roster/manageVisitor/${cid}`);
				M.toast({
					html: '<i class="material-icons left">done</i> Visitor successfully added to roster! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.getNewApplications();
			} catch(e) {
				console.log(e);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			}
		},
		async rejectVisitor(id, i) {
			try {
				await zabApi.put(`/controller/visit/applications/reject/${id}`, {
					reason: this.reason
				});
				this.reason = '';
				M.toast({
					html: '<i class="material-icons left">done</i> Application successfully rejected <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.getNewApplications();
				M.Modal.getInstance(document.querySelector(`#modal_reject_${i}`)).close();
			} catch(e) {
				console.log(e);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			}
		},
		openRejectModal(i) {
			M.Modal.getInstance(document.querySelector(`#modal_${i}`)).close();
			M.Modal.getInstance(document.querySelector(`#modal_reject_${i}`)).open();
		},
		formatDate(date) {
			return new Date(date).toISOString().slice(0,-8).replace('T', ', ');
		}
	}
};
</script>

<style scoped lang="scss">
.options {
	text-align: right;
}

.row_no_margin {
	margin-bottom: 0;
}

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
	padding: 1em;
	margin-top: -10px;
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