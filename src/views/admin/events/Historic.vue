<template>
    <div class="card">
        <div class="card-content">
            <span class="card-title">Historic Events</span>
		</div>
		<div class="loading_container" v-if="!historicEvents">
			<Spinner />
		</div>
		<p v-else-if="historicEvents && historicEvents.length == 0" class="no_event">There are no historic events to display.</p>
		<div v-else>
			<table class="event_list striped">
				<thead class="event_list_head">
					<tr>
						<th>Name</th>
						<th>Date</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="event_list_row" v-if="historicEvents">
					<tr v-for="(event, i) in historicEvents" :key="event.id">
						<td class="name">
							<router-link :to="`/events/${event.url}`">
								{{event.name}}
							</router-link><br />
						</td>
						<td class="date">
							{{format_full(event.eventStart)}}z
						</td>
						<td class="options">
							<router-link data-position="top" data-tooltip="Edit Event" class="tooltipped" :to="`/admin/events/edit/${event.url}`">
								<i class="material-icons">edit</i>
							</router-link>
							<a :href="`#modal_historic_${i}`" data-position="top" data-tooltip="Delete Event" class="tooltipped modal-trigger">
								<i class="material-icons">delete</i>
							</a>
						</td>
						<div :id="`modal_historic_${i}`" class="modal modal_delete">
							<div class="modal-content">
								<h4>Are you sure?</h4>
								<p>Events shouldn't be deleted unless they contain errors or were canceled. If you're not sure, click cancel. Otherwise, continue.</p>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="deleteEvent(event.url)">I'm sure</a>
								<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
			<div class="row row_no_margin" v-if="historicEvents && eventAmount !== 0">
				<div class="page_info col s12 l6">
					Showing {{minEntries}}–{{maxEntries}} of {{eventAmount}} entries
				</div>
				<div class="col s12 l6">
					<ul class="pagination right">
						<li :class="isFirstPage ? 'disabled' : 'waves-effect'"><a @click="isFirstPage ? '' : page -= 1"><i class="material-icons">chevron_left</i></a></li>
						<li v-for="pageNo in showPages" class="waves-effect" :class="pageNo == page ? 'active' : ''" :key="pageNo" @click="page = pageNo"><a>{{pageNo}}</a></li>
						<li :class="isLastPage ? 'disabled' : 'waves-effect'"><a @click="isLastPage ? '' : page += 1"><i class="material-icons">chevron_right</i></a></li>
					</ul>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import {EventsMixin} from '@/mixins/EventsMixin.js';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'HistoricEvents',
	data() {
		return {
			historicEvents: null,
			eventAmount: 1,
			page: 1,
			limit: 10,
			amountOfPages: 1
		};
	},
	components: {
		Spinner
	},
	mixins: [EventsMixin],
	async mounted() {
		await this.getHistoricEvents();
		this.amountOfPages = Math.ceil(this.eventAmount / this.limit);
	},
	methods: {
		async getHistoricEvents() {
			const response = await this.getHistoricEventsMixin(this.page, this.limit);
			this.historicEvents = response.events;
			this.eventAmount = response.amount;
		},
		format_full(value) {
			var d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false});
		},
		format_hour(value) {
			var d = new Date(value);
			return d.toLocaleString('en-us', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false});
		}
	},
	computed: {
		isFirstPage() {
			if(this.page == 1) return true;
			else return false;
		},
		isLastPage() {
			if(this.page * this.limit >= this.eventAmount) return true;
			else return false;
		},
		minEntries() {
			if(this.page == 1) return 1;
			else return (this.page - 1) * this.limit;
		},
		maxEntries() {
			if(Math.ceil(this.eventAmount / this.limit) == this.page) return this.eventAmount;
			else return this.page * this.limit;
		},
		showPages() {
			const ceiling = Math.ceil(this.eventAmount / this.limit);
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
			this.historicEvents = null;
			await this.getHistoricEvents();
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
	padding-left: 1.5em;
	font-size: 0.9rem;
	margin-top: 1.5em;
}

.event_banner {
	width: 100%;
}
.event_list_row tr {
	transition: background-color .3s ease;
	&:hover {
		background: #eaeaea;
	}
}

.event_title {
	font-weight: 700;
}

.options {
	text-align: right;
}

.card .card-content .event_date {
	font-size: 1.15em; 
	margin-top: -15px;

	.rotate {
		transform: rotate(90deg);
	}
}

tr th {
	text-align: left;
}

td {
	padding: 1em;
}
td a {
	transition: .3s;
	font-weight: 600;
	&:hover {
		color: $primary-color-light;
	}
}
.event_card .card-content .row {
	margin-bottom: 0;
}

.no_event {
	padding: 1em;
	margin-top: -10px;
	font-style: italic;
}
</style>