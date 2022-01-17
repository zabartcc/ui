<template>
    <div class="card">
        <div class="card-content">
            <span class="card-title">Past Events</span>
		</div>
		<div class="loading_container" v-if="!historicEvents">
			<Spinner />
		</div>
		<p v-else-if="historicEvents && !historicEvents.length" class="no_event">There are no past events</p>
		<div v-else>
			<table class="event_list striped">
				<thead class="event_list_head">
					<tr>
						<th>Name</th>
						<th class="right">Date</th>
					</tr>
				</thead>
				<tbody class="event_list_row">
					<tr v-for="event in historicEvents" :key="event.id">
						<td class="name">
							<router-link :to="`/events/${event.url}`">
								{{ event.name }}
							</router-link><br />
						</td>
						<td class="date right">
							{{ dtLong(event.eventStart) }}
						</td>
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
import {zabApi} from '@/helpers/axios.js';
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
		Pagination
	},
	async mounted() {
		await this.getHistoricEvents();
		this.amountOfPages = Math.ceil(this.eventAmount / this.limit);
	},
	methods: {
		async getHistoricEvents() {
			const { data } = await zabApi.get('/event/archive', {
				params: {
					page: this.page,
					limit: this.limit
				}
			});
			this.historicEvents = data.data.events;
			this.eventAmount = data.data.amount;
		},
		updatePageNo(pageNo) {
			this.page === pageNo;
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

.card .card-content .event_date {
	font-size: 1.15em; 
	margin-top: -15px;

	.rotate {
		transform: rotate(90deg);
	}
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
	margin-top: -1em;
	font-style: italic;
}
</style>