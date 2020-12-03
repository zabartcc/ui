<template>
	<div class="card" v-if=unapproved>
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s12"><span class="card-title">Unapproved Feedback</span></div>
			</div>
		</div>
		<p class="no_unapproved" v-if="unapproved.length == 0">There is no unapproved feedback to display.</p>
		<table class="event_list striped" v-else>
			<thead class="controller_list_head">
				<tr>
					<th>Submitter</th>
					<th>Controller</th>
					<th>Rating</th>
					<th class="options">Options</th>
				</tr>
			</thead>
			<tbody class="event_list_row">
				<tr v-for="(feedback, i) in unapproved" :key="feedback._id">
					<td>{{feedback.fname}} {{feedback.lname}}</td>
					<td>{{feedback.controller.fname || ''}} {{feedback.controller.lname || 'Unknown'}}</td>
					<td>{{convertRating(feedback.rating)}}</td>
					<td class="options">
						<a :href="`#modal_unapproved_${i}`" data-position="top" data-tooltip="View Feedback" class="tooltipped modal-trigger">
							<i class="material-icons">search</i>
						</a>
					</td>
					<div :id="`modal_unapproved_${i}`" class="modal modal_unapproved">
						<div class="modal-content">
							<div class="modal_title">Unapproved Feedback for {{feedback.controller.fname || ''}} {{feedback.controller.lname || 'Unknown'}}</div>
							<div class="feedback">
								<div class="row row_no_margin" id="feedback">
									<div class="input-field col s6">
										<p id="first_name">{{feedback.fname + ' ' + feedback.lname}}</p>
										<label for="first_name" class="active">Submitter Name</label>
									</div>
									<div class="input-field col s6">
										<p id="cid">{{feedback.submitter}}</p>
										<label for="cid" class="active">Submitter CID</label>
									</div>
									<div class="input-field col s6">
										<p id="email">{{feedback.email}}</p>
										<label for="email" class="active">Submitter Email Address</label>
									</div>
									<div class="input-field col s6">
										<p id="submission">{{formatDate(feedback.createdAt)}}z</p>
										<label for="submission" class="active">Submission Date</label>
									</div>
									<div class="input-field col s6">
										<p id="submission">{{feedback.controller.fname + ' ' + feedback.controller.lname}}</p>
										<label for="submission" class="active">Controller</label>
									</div>
									<div class="input-field col s6">
										<p id="rating">{{convertRating(feedback.rating)}}</p>
										<label for="rating" class="active">Rating</label>
									</div>
									<div class="input-field col s12">
										<pre id="comments">{{feedback.comments}}</pre>
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
	<RecentFeedback />
</template>

<script>
import { FeedbackMixin } from '@/mixins/FeedbackMixin.js';
import RecentFeedback from './Recent';

export default {
	data() {
		return {
			unapproved: null
		};
	},
	mixins: [FeedbackMixin],
	components: {
		RecentFeedback
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
			const auth = `Bearer ${localStorage.getItem('token') || null}`;
			this.unapproved = await this.getUnapprovedMixin(auth);
		},
		async approveFeedback(id) {
			const auth = `Bearer ${localStorage.getItem('token') || null}`;
			const success = await this.approveFeedbackMixin(id, auth).catch((err) => {
				console.log(err);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});
				return false;
			});
			if(success) {
				M.toast({
					html: '<i class="material-icons left">done</i> Feedback successfully approved <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				await this.getUnapproved();
				setTimeout(() => M.Modal.getInstance(document.querySelector('.modal_unapproved')).close(), 500);
			}
		},
		async rejectFeedback(id) {
			const auth = `Bearer ${localStorage.getItem('token') || null}`;
			const success = await this.rejectFeedbackMixin(id, auth).catch((err) => {
				console.log(err);
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Something went wrong, please try again <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});
				return false;
			});
			if(success) {
				M.toast({
					html: '<i class="material-icons left">done</i> Feedback successfully rejected <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_info',
				});
				await this.getUnapproved();
				setTimeout(() => M.Modal.getInstance(document.querySelector('.modal_unapproved')).close(), 500);
			}
		},
		convertRating(rating) {
			if(rating === 5) return "Excellent";
			else if(rating === 4) return "Above Average";
			else if(rating === 3) return "Average";
			else if(rating === 2) return "Below Average";
			else if(rating === 1) return "Poor";
			else return "Unknown";
		},
		formatDate(date) {
			return new Date(date).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		}
	}
};
</script>

<style scoped lang="scss">
.row_no_margin {
	margin-bottom: 0;
}

.options {
	text-align: right;
}

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
	padding: 1em;
	margin-top: -10px;
	font-style: italic;
}

.modal_unapproved {
	min-width: 400px;
	width: 35%;
}

.feedback_title {
	color: #9e9e9e;
	font-size: .8rem;
}

.feedback {
	#comments {
		font-family: inherit;
	}
	.row {
		.input-field p, .input-field pre {
			margin: .33em 0 0 0;
		}
	}
}

.feedback_content {
	margin-top: -3px;
	white-space: pre-wrap;
}
</style>