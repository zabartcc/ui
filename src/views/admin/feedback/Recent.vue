<template>
	<div class="card" v-if=recentFeedback>
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s12"><span class="card-title">Feedback</span></div>
			</div>
		</div>
		<p class="no_feedback" v-if="feedbackAmount === 0">There is no recent feedback to display.</p>
		<div class="feedback_wrapper" v-else>
			<table class="event_list striped">
				<thead class="controller_list_head">
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
						<td>{{feedback.controller.fname || ''}} {{feedback.controller.lname || 'Unknown'}}</td>
						<td>{{convertRating(feedback.rating)}}</td>
						<td>{{feedback.deletedAt == null ? 'Approved' : 'Rejected'}}</td>
						<td class="options">
							<a :href="`#modal_feedback_${this.page}_${i}`" data-position="top" data-tooltip="View Feedback" class="tooltipped modal-trigger">
								<i class="material-icons">search</i>
							</a>
						</td>
						<div :id="`modal_feedback_${this.page}_${i}`" class="modal modal_feedback">
							<div class="modal-content">
								<div class="modal_title">Feedback for {{feedback.controller.fname + ' ' + feedback.controller.lname  || 'Unknown'}}</div>
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
								<a href="#!" class="modal-close waves-effect btn-flat">Close</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="page_info left">
			Showing {{minEntries}}–{{maxEntries}} of {{this.feedbackAmount}} entries
		</div>
		<ul class="pagination right">
			<li :class="isFirstPage ? 'disabled' : 'waves-effect'"><a @click="isFirstPage ? '' : this.page -= 1"><i class="material-icons">chevron_left</i></a></li>
			<li v-for="page in showPages" class="waves-effect" :class="this.page == page ? 'active' : ''" :key="page" @click="this.page = page"><a>{{page}}</a></li>
			<li :class="isLastPage ? 'disabled' : 'waves-effect'"><a @click="isLastPage ? '' : this.page += 1"><i class="material-icons">chevron_right</i></a></li>
		</ul>
	</div>
</template>

<script>
import { FeedbackMixin } from '@/mixins/FeedbackMixin.js';

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
			return new Date(date).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		}
	},
	computed: {
		isFirstPage() {
			if(this.page == 1) return true;
			else return false;
		},
		isLastPage() {
			if(this.page * this.limit >= this.feedbackAmount) return true;
			else return false;
		},
		minEntries() {
			if(this.page == 1) return 1;
			else return (this.page - 1) * this.limit;
		},
		maxEntries() {
			if(Math.ceil(this.feedbackAmount / this.limit) == this.page) return this.feedbackAmount;
			else return this.page * this.limit;
		},
		showPages() {
			const ceiling = Math.ceil(this.feedbackAmount / this.limit);
			if(ceiling <= 5) {
				return (ceiling);
			} else if (ceiling > 5 && this.page <= 3 && (this.page - 2) <= this.amountOfPages) {
				return 5;
			} else if (ceiling > 5 && this.page > (this.amountOfPages - 2)) {
				if(this.page != this.amountOfPages) {
					return [this.page - 3, this.page -2, this.page -1, this.page, this.page + 1];
				} else {
					return [this.page - 4, this.page -3, this.page -2, this.page -1, this.page];
				}
			} else {
				let array = [];
				let j = -1; // array starts at zero
				for(let i = (this.page - 2); i < (this.page + 3); i++) {
					j++;
					array[j] = i;
				}
				return array;
			}
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
.row_no_margin {
	margin-bottom: 0;
}

.page_info {
	padding-left: 1em;
	margin-top: -40px;
}

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
	min-width: 400px;
	width: 35%;
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


.pagination {
	margin-top: -45px;
}

.feedback_wrapper {
	padding-bottom: 60px;
}

.options {
	text-align: right;
}

</style>