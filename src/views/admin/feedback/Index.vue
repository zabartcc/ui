<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Unapproved Feedback</span>
		</div>
		<div class="loading_container" v-if="unapproved === null">
			<Spinner />
		</div>
		<p class="no_unapproved" v-else-if="unapproved && unapproved.length == 0">There is no unapproved feedback to display.</p>
		<div class="feedback_wrapper" v-else>
			<table class="event_list striped">
				<thead class="feedback_list_head">
					<tr>
						<th>Date</th>
						<th>Submitter</th>
						<th>Controller</th>
						<th>Rating</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="event_list_row">
					<tr v-for="(feedback, i) in unapproved" :key="feedback._id">
						<td>{{formatDate(feedback.createdAt)}}z</td>
						<td><span v-if="feedback.anonymous"><strong>Anonymous</strong><i> ({{feedback.name}})</i></span><span v-else>{{feedback.name}}</span></td>
						<td>{{feedback.controller == null ? 'Unknown' : feedback.controller.fname + ' ' + feedback.controller.lname}}</td>
						<td>{{convertRating(feedback.rating)}}</td>
						<td class="options">
							<a :href="`#modal_unapproved_${i}`" data-position="top" data-tooltip="View Feedback" class="tooltipped modal-trigger">
								<i class="material-icons">search</i>
							</a>
						</td>
						<div :id="`modal_unapproved_${i}`" class="modal modal_unapproved">
							<div class="modal-content">
								<div class="modal_title">Unapproved Feedback for {{feedback.controller == null ? 'Unknown' : feedback.controller.fname + ' ' + feedback.controller.lname}}</div>
								<div class="feedback">
									<div class="row row_no_margin" id="feedback">
										<div class="input-field col s6">
											<p id="first_name">{{feedback.name}} <span v-if="feedback.anonymous"><i><strong>(Anonymous)</strong></i></span></p>
											<label for="first_name" class="active">Submitter Name</label>
										</div>
										<div class="input-field col s6">
											<p id="cid">{{feedback.submitter}}</p>
											<label for="cid" class="active">Submitter CID</label>
										</div>
										<div class="input-field col s6">
											<p id="email">{{feedback.email}}</p>
											<label for="email" class="active">Submitter Email</label>
										</div>
										<div class="input-field col s6">
											<p id="submission">{{formatDate(feedback.createdAt)}}z</p>
											<label for="submission" class="active">Submission Date</label>
										</div>
										<div class="input-field col s6">
											<p id="submission">{{feedback.controller == null ? 'Unknown' : feedback.controller.fname + ' ' + feedback.controller.lname}}</p>
											<label for="submission" class="active">Controller</label>
										</div>
										<div class="input-field col s6">
											<p id="position">{{feedback.position}}</p>
											<label for="position" class="active">Position</label>
										</div>
										<div class="input-field col s6">
											<p id="rating">{{convertRating(feedback.rating)}}</p>
											<label for="rating" class="active">Rating</label>
										</div>
										<div class="input-field col s12">
											<div id="comments">{{feedback.comments}}</div>
											<label for="comments" class="active">Comments</label>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="approveFeedback(feedback._id)">Approve</a>
								<a href="#!" class="waves-effect btn-flat" @click="rejectFeedback(feedback._id)">Reject</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<RecentFeedback />
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import RecentFeedback from './Recent';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'Feedback',
	title: 'Feedback',
	data() {
		return {
			unapproved: null
		};
	},
	components: {
		RecentFeedback,
		Spinner
	},
	async mounted() {
		await this.getUnapproved();
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getUnapproved() {
			const {data} = await zabApi.get('/feedback/unapproved');
			this.unapproved = data.data;
		},
		async approveFeedback(id) {
			try {
				const {data} = await zabApi.put(`/feedback/approve/${id}`);
				if(data.ret_det.code === 200) {
					M.toast({
						html: '<i class="material-icons left">done</i> Feedback successfully approved <div class="border"></div>',
						displayLength: 5000,
						classes: 'toast toast_success',
					});
					await this.getUnapproved();
					setTimeout(() => M.Modal.getInstance(document.querySelector('.modal_unapproved')).close(), 500);
				} else {
					M.toast({
						html: `<i class="material-icons left">error_outline</i> ${data.ret_det.message} <div class="border"></div>`,
						displayLength: 5000,
						classes: 'toast toast_error'
					});
				}
			} catch(e) {
				console.log(e);
			}
		},
		async rejectFeedback(id) {
			try {
				const {data} = await zabApi.put(`/feedback/reject/${id}`);
				if(data.ret_det.code === 200) {
					M.toast({
						html: '<i class="material-icons left">done</i> Feedback successfully rejected <div class="border"></div>',
						displayLength: 5000,
						classes: 'toast toast_success',
					});
					await this.getUnapproved();
					setTimeout(() => M.Modal.getInstance(document.querySelector('.modal_unapproved')).close(), 500);
				} else {
					M.toast({
						html: `<i class="material-icons left">error_outline</i> ${data.ret_det.message} <div class="border"></div>`,
						displayLength: 5000,
						classes: 'toast toast_error'
					});
				}
			} catch(e) {
				console.log(e);
			}
		},
		convertRating(rating) {
			const ratings = ['Poor', 'Below Average', 'Average', 'Above Average', 'Excellent'];
			return ratings[rating];
		},
		formatDate(date) {
			return new Date(date).toISOString().slice(0,-8).replace('T', ', ');
		}
	}
};
</script>

<style scoped lang="scss">
.modal_title {
	font-size: 1.8em;
	margin-bottom: .5em;
}

table tbody {
	tr {
		transition: background-color .3s ease;
		&:hover {
			background: #eaeaea;
		}
	}
}

.no_unapproved {
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

.modal_unapproved {
	min-width: 300px;
	width: 35%;
}

.feedback_title {
	color: #9e9e9e;
	font-size: .8rem;
}

.feedback {
	#comments {
		font-family: inherit;
		white-space: pre-wrap;
		overflow: hidden;
		width: 100%;
	}
	#position {
		text-transform: capitalize;
	}
	.row {
		.input-field p {
			line-break: anywhere;
			margin: .33em 0 0 0;
		}
	}
}

.feedback_content {
	margin-top: -3px;
	white-space: pre-wrap;
}

.feedback_wrapper {
	width: 100%;
	overflow: auto;
}

</style>