<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s12"><span class="card-title">Recent Feedback</span></div>
			</div>
		</div>
		<div class="loading_container" v-if="!recentFeedback">
			<Spinner />
		</div>
		<p class="no_feedback" v-else-if="recentFeedback && feedbackAmount === 0">There is no recent feedback to display.</p>
		<div class="feedback_wrapper" v-else>
			<table class="event_list striped">
				<thead class="event_list_head">
					<tr>
						<th>Date</th>
						<th>Controller</th>
						<th>Rating</th>
						<th>Status</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="event_list_row">
					<tr v-for="(feedback, i) in recentFeedback" :key="feedback._id">
						<td>{{formatDate(feedback.createdAt)}}z</td>
						<td>{{feedback.controller === null ? 'Unknown' : feedback.controller.fname + ' ' + feedback.controller.lname}}</td>
						<td>{{convertRating(feedback.rating)}}</td>
						<td>{{feedback.deleted ? 'Rejected' : 'Approved'}}</td>
						<td class="options">
							<a :href="`#modal_feedback_${i}`" data-position="top" data-tooltip="View Feedback" class="tooltipped modal-trigger">
								<i class="material-icons">search</i>
							</a>
						</td>
						<div :id="`modal_feedback_${i}`" class="modal modal_feedback">
							<div class="modal-content">
								<div class="modal_title">Feedback for {{feedback.controller === null ? 'Unknown' : feedback.controller.fname + ' ' + feedback.controller.lname}}</div>
								<div class="feedback">
								<div class="row row_no_margin" id="feedback">
									<div class="input-field col s6">
										<p id="first_name"><span v-if="feedback.anonymous"><strong>Anonymous</strong><i> ({{feedback.name}})</i></span><span v-else>{{feedback.name}}</span></p>
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
										<p id="submission">{{feedback.controller === null ? 'Unknown' : feedback.controller.fname + ' ' + feedback.controller.lname}}</p>
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
										<pre id="comments">{{feedback.comments}}</pre>
										<label for="comments" class="active">Comments</label>
									</div>
								</div>
							</div>
							</div>
							<div class="modal-footer">
								<a href="#!" class="modal-close waves-effect btn-flat">Close</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="recentFeedback && feedbackAmount !== 0">
			<Pagination :amount="feedbackAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
		</div>
	</div>
</template>

<script>
import {FeedbackMixin} from '@/mixins/FeedbackMixin.js';
import Spinner from '@/components/Spinner.vue';
import Pagination from '@/components/Pagination.vue';

export default {
	data() {
		return {
			page: 1,
			limit: 10,
			recentFeedback: null,
			feedbackAmount: 1,
			amountOfPages: 1
		};
	},
	mixins: [FeedbackMixin],
	components: {
		Spinner,
		Pagination
	},
	async mounted() {
		await this.getFeedback();
		this.amountOfPages = Math.ceil(this.feedbackAmount / this.limit);
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getFeedback() {
			const response = await this.getFeedbackMixin(this.page, this.limit);
			this.recentFeedback = response.feedback;
			this.feedbackAmount = response.amount;
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
			return new Date(date).toISOString().slice(0,-8).replace('T', ', ');
		}
	},
	watch: {
		page: async function() {
			await this.getFeedback();
			M.Modal.init(document.querySelectorAll('.modal'), {
				preventScrolling: false
			});
			M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
				margin: 0
			});
		}
	}
};
</script>

<style scoped lang="scss">
.no_feedback {
	padding: 1em;
	margin-top: -10px;
	font-style: italic;
}

.modal_title {
	font-size: 1.8em;
	margin-bottom: .5em;
}

.modal_feedback {
	min-width: 300px;
	width: 35%;
}

.feedback_wrapper {
	width: 100%;
	overflow: auto;
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
		.input-field p, .input-field pre {
			margin: .33em 0 0 0;
			line-break: anywhere;
		}
	}
}

.feedback_content {
	margin-top: -3px;
	white-space: pre-wrap;
}


.options {
	text-align: right;
}
</style>