<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Unapproved Feedback</span>
		</div>
		<div class="loading_container" v-if="unapproved === null">
			<Spinner />
		</div>
		<p class="no_unapproved" v-else-if="unapproved && unapproved.length === 0">There is no unapproved feedback</p>
		<div class="feedback_wrapper" v-else>
			<table class="feedback_list striped">
				<thead class="feedback_list_head">
					<tr>
						<th>Date</th>
						<th>Submitter</th>
						<th>Controller</th>
						<th>Rating</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="feedback_list_row">
					<tr v-for="(feedback, i) in unapproved" :key="feedback._id">
						<td>{{dtLong(feedback.createdAt)}}</td>
						<td><span v-if="feedback.anonymous"><strong>Anonymous</strong> ({{feedback.name}})</span><span v-else>{{feedback.name}}</span></td>
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
											<p id="submission">{{feedback.controller == null ? 'Unknown' : feedback.controller.fname + ' ' + feedback.controller.lname}}</p>
											<label for="submission" class="active">Controller</label>
										</div>
										<div class="input-field col s12 m6">
											<p id="position">{{feedback.position}}</p>
											<label for="position" class="active">Position</label>
										</div>
										<div class="input-field col s12 m6">
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
							<div class="modal-footer" v-if="requiresAuth(['atm', 'datm', 'ta'])">
								<a href="#!" class="waves-effect waves-light btn" @click="approveFeedback(feedback._id)">Approve</a>
								<a href="#!" class="waves-effect waves-light btn-flat" @click="rejectFeedback(feedback._id)">Reject</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<RecentFeedback ref="recentFeedback" />
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import RecentFeedback from './Recent.vue';
import { mapState } from 'vuex';

export default {
	name: 'Feedback',
	title: 'Feedback',
	data() {
		return {
			unapproved: null
		};
	},
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
		requiresAuth(roles) {
			const havePermissions = roles.some(r => this.user.data.roleCodes.includes(r));
			if(havePermissions) {
				return true;
			} else {
				return false;
			}
		},
		async getUnapproved() {
			const {data} = await zabApi.get('/feedback/unapproved');
			this.unapproved = data.data;
		},
		async approveFeedback(id) {
			try {
				const {data} = await zabApi.put(`/feedback/approve/${id}`);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Feedback approved');
					await this.getUnapproved();
					this.$refs.recentFeedback.getFeedback();
					this.$nextTick(() => {
						M.Modal.getInstance(document.querySelector('.modal_unapproved')).close();
					});
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		async rejectFeedback(id) {
			try {
				const {data} = await zabApi.put(`/feedback/reject/${id}`);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Feedback rejected');
					await this.getUnapproved();
					this.$refs.recentFeedback.getFeedback();
					this.$nextTick(() => {
						M.Modal.getInstance(document.querySelector('.modal_unapproved')).close();
					});
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		convertRating(rating) {
			const ratings = ['Poor', 'Below Average', 'Average', 'Above Average', 'Excellent'];
			return ratings[rating - 1];
		}
	},
	computed: {
		...mapState('user', [
			'user'
		])
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
		.input-field p, .input-field div {
			margin: .33em 0 0 0;
			white-space: pre-wrap;
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