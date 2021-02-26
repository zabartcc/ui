<template>
    <div class="card">
        <div class="card-content">
            <span class="card-title">Past Events</span>
		</div>
		<div class="loading_container" v-if="!historicEvents">
			<Spinner />
		</div>
		<p v-else-if="historicEvents && historicEvents.length == 0" class="no_event">There are no past events to display.</p>
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
								<i class="material-icons red-text text-darken-2">delete</i>
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
			<div v-if="historicEvents && eventAmount !== 0">
				<Pagination :amount="eventAmount" :page="page" :limit="limit" :amountOfPages="amountOfPages" />
			</div>
		</div>
    </div>
</template>

<script>
import {EventsMixin} from '@/mixins/EventsMixin.js';
import Spinner from '@/components/Spinner.vue';
import Pagination from '@/components/Pagination.vue';

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
		Spinner,
		Pagination
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
	watch: {
		page: async function() {
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
	padding: 0 1em 1em 1em;
	margin-top: -10px;
	font-style: italic;
}
</style>