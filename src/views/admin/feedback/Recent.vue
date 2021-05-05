<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Recent Feedback</span>
		</div>
		<div class="loading_container" v-if="recentFeedback === null">
			<Spinner />
		</div>
		<p class="no_feedback" v-else-if="recentFeedback && feedbackAmount === 0">There is no recent feedback</p>
		<div class="feedback_wrapper" v-else>
			<table class="feedback_list striped">
				<thead class="feedback_list_head">
					<tr>
						<th class="status"></th>
						<th>Date</th>
						<th>Controller</th>
						<th>Rating</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="feedback_list_row">
					<tr v-for="(feedback, i) in recentFeedback" :key="feedback._id">
						<td class="status"><i class="material-icons red-text text-darken-1" v-if="feedback.deleted">close</i><i class="material-icons green-text" v-else>check</i></td>
						<td>{{dtLong(feedback.createdAt)}}</td>
						<td>{{feedback.controller === null ? feedback.controllerCid : feedback.controller.fname + ' ' + feedback.controller.lname}}</td>
						<td>{{convertRating(feedback.rating)}}</td>
						<td class="options">
							<a :href="`#modal_feedback_${i}`" data-position="top" data-tooltip="View Feedback" class="tooltipped modal-trigger">
								<i class="material-icons">search</i>
							</a>
						</td>
						<div :id="`modal_feedback_${i}`" class="modal modal_feedback">
							<div class="modal-content">
								<div class="modal_title">Feedback for {{feedback.controller === null ? feedback.controllerCid : feedback.controller.fname + ' ' + feedback.controller.lname}}</div>
								<div class="feedback">
								<div class="row row_no_margin" id="feedback">
									<div class="input-field col s12 m6">
										<p id="first_name"><span v-if="feedback.anonymous"><strong>Anonymous</strong> ({{feedback.name}})</span><span v-else>{{feedback.name}}</span></p>
										<label for="first_name" class="active">Submitter Name</label>
									</div>
									<div class="input-field col s12 m6">
										<p id="cid">{{feedback.submitter}}</p>
										<label for="cid" class="active">Submitter CID</label>
									</div>
									<div class="input-field col s12 m6">
										<p id="email">{{feedback.email}}</p>
										<label for="email" class="active">Submitter Email</label>
									</div>
									<div class="input-field col s12 m6">
										<p id="submission">{{dtLong(feedback.createdAt)}}</p>
										<label for="submission" class="active">Date</label>
									</div>
									<div class="input-field col s12 m6">
										<p id="submission">{{feedback.controller === null ? feedback.controllerCid : feedback.controller.fname + ' ' + feedback.controller.lname}}</p>
										<label for="submission" class="active">Controller</label>
									</div>
									<div class="input-field col s12 m6">
										<p id="position">{{feedback.position || '—'}}</p>
										<label for="position" class="active">Position</label>
									</div>
									<div class="input-field col s12 m6">
										<p id="rating">{{convertRating(feedback.rating)}}</p>
										<label for="rating" class="active">Rating</label>
									</div>
									<div class="input-field col s12">
										<div id="comments">{{feedback.comments || '—'}}</div>
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
import {zabApi} from '@/helpers/axios.js';
import Pagination from '@/components/Pagination.vue';

export default {
	data() {
		return {
			page: 1,
			limit: 20,
			recentFeedback: null,
			feedbackAmount: 1,
			amountOfPages: 1
		};
	},
	components: {
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
			const {data} = await zabApi.get('/feedback', {
				params: {
					page: this.page, 
					limit: this.limit
				}
			});
			this.recentFeedback = data.data.feedback;
			this.feedbackAmount = data.data.amount;
		},
		convertRating(rating) {
			const ratings = ['Poor', 'Below Average', 'Average', 'Above Average', 'Excellent'];
			return ratings[rating - 1];
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
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

.modal_title {
	font-size: 1.8em;
	margin-bottom: .5em;
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

.status {
	width: 40px;
}
</style>