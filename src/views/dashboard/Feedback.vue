<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Your Feedback</span>
		</div>
		<div class="loading_container" v-if="!feedback">
			<Spinner />
		</div>
		<p class="no_feedback" v-else-if="feedback && !feedback.length">You have not received any feedback yet</p>
		<div class="feedback_wrapper" v-else>
			<table class="feedback_list striped">
				<thead class="feedback_list_head">
					<tr>
						<th>Date</th>
						<th>Position</th>
						<th>Rating</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="feedback_list_row" v-if="feedback">
					<tr v-for="(feedback, i) in feedback" :key="feedback._id">
						<td>{{ dtLong(feedback.createdAt) }}</td>
						<td id="position">{{ feedback.position || '—' }}</td>
						<td>{{ convertRating(feedback.rating) }}</td>
						<td class="options">
							<a :href="`#modal_feedback_${i}`" data-position="top" data-tooltip="View Details" class="tooltipped modal-trigger">
								<i class="material-icons">search</i>
							</a>
						</td>
						<div :id="`modal_feedback_${i}`" class="modal modal_feedback">
							<div class="modal-content">
								<div class="modal_title">Feedback Details</div>
								<div class="feedback">
									<div class="row row_no_margin" id="feedback">
										<div class="input-field col s12 m6">
											<p id="first_name">{{ feedback.anonymous ? 'Anonymous' : feedback.name }}</p>
											<label for="first_name" class="active">From</label>
										</div>
										<div class="input-field col s12 m6">
											<p id="submission">{{ dtLong(feedback.createdAt) }}</p>
											<label for="submission" class="active">Date</label>
										</div>
										<div class="input-field col s12 m6">
											<p id="position">{{ feedback.position || '—' }}</p>
											<label for="position" class="active">Position</label>
										</div>
										<div class="input-field col s12 m6">
											<p id="rating">{{ convertRating(feedback.rating) }}</p>
											<label for="rating" class="active">Rating</label>
										</div>
										<div class="input-field col s12">
											<div id="comments">{{ feedback.comments || '—' }}</div>
											<label for="comments" class="active">Comments</label>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn-flat modal-close">Close</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-if="feedback && feedbackAmount">
			<Pagination :amount="feedbackAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Pagination from '@/components/Pagination.vue';

export default {
	name: 'UserFeedback',
	title: 'Your Feedback',
	data() {
		return {
			feedback: null,
			feedbackAmount: 0,
			page: 1,
			limit: 10,
			amountOfPages: 1
		};
	},
	components: {
		Pagination
	},
	async mounted() {
		await this.getMyFeedback();
		this.amountOfPages = Math.ceil(this.feedbackAmount / this.limit);
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getMyFeedback() {
			const { data } = await zabApi.get(`/feedback/own`, {
				params: {
					page: this.page,
					limit: this.limit
				}
			});
			this.feedback = data.data.feedback;
			this.feedbackAmount = data.data.amount;
		},
		convertRating(rating) {
			const ratings = ['Poor', 'Below Average', 'Average', 'Above Average', 'Excellent'];
			return ratings[rating - 1];
		}
	},
	watch: {
		page: async function() {
			await this.getMyFeedback();
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
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

.modal_title {
	font-size: 1.8em;
	margin-bottom: .5em;
}

.feedback_list {
	min-width: 400px;
}

.feedback_wrapper {
	width: 100%;
	overflow: auto;
}

#position {
	text-transform: capitalize;
}

.feedback {
	#comments {
		font-family: inherit;
		white-space: pre-wrap;
		overflow: hidden;
		width: 100%;
	}

	.row {
		.input-field p, .input-field div {
			margin: .33em 0 0 0;
			line-break: normal;
		}
	}
}

.feedback_content {
	margin-top: -3px;
	white-space: pre-wrap;
}
</style>