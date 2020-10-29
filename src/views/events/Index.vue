<template>
    <div class="card" v-if="events.length == 0">
        <div class="card-content">
            <span class="card-title">Upcoming Events</span>
            <span style="font-style: italic;">We're sorry, but there are no upcoming events planned. Please check back later.</span>
        </div>
    </div>
    <div class="card event_card" v-for="event in events" :key="event.id">
        <img :src="event.bannerUrl" class="event_banner" draggable="false" />
        <div class="card-content">
            <div class="row">
                <div class="col s12 l8">
                    <span class="card-title event_title">{{event.name}}</span>
                    <span class="card-title event_date">{{format_full(event.eventStart)}}z <i class="material-icons plane">airplanemode_active</i> {{format_hour(event.eventEnd)}}z</span>
                </div>
                <div class="col s12 l4">
                    <router-link :to="`/events/${event.url}`" class="btn btn-signup waves-effect right">More Info &amp; Sign Up</router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-content">
            <span class="card-title">Historic Events</span>
		</div>
		<p v-if="historicEvents.length == 0" class="no_historic">There are no historic events to display.</p>
		<table class="event_list striped" v-else>
			<tbody class="event_list_row">
				<tr v-for="event in historicEvents" :key="event.id">
					<td class="name">
						<router-link :to="`/events/${event.url}`">
							{{event.name}}
						</router-link><br />
					</td>
					<td class="date right">
						{{format_full(event.eventStart)}}z
					</td>
				</tr>
			</tbody>
		</table>
    </div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';

export default {
	name: 'Events',
	data() {
		return {
			events: [],
			historicEvents: []
		};
	},
	mixins: [EventsMixin],
	mounted() {
		this.getUpcomingEvents();
		this.getHistoricEvents();
	},
	methods: {
		async getUpcomingEvents() {
			this.events = await this.getUpcomingEventsMixin();
		},
		async getHistoricEvents() {
			this.historicEvents = await this.getHistoricEventsMixin();
		},
		format_full(value) {
			var d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false});
		},
		format_hour(value) {
			var d = new Date(value);
			return d.toLocaleString('en-us', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false});
		}
	}
};
</script>

<style scoped lang="scss">
    .event_banner {
        width: 100%;
    }
    .event_list_row tr {
		&:hover {
			background: $gray-mild;
		}
    }

    .event_title {
        font-weight: 600;
    }

    .card .card-content .event_date {
		display: inline-flex;
		align-items: center;
        font-size: 1.15em; 
        margin-top: -15px;

		.plane {
			transform: rotate(90deg);
			font-size: 1.3rem;
			margin: 0px 5px;
		}
    }

    tr th {
        text-align: left;
    }

    td {
        padding: 1em;
    }
    td a {
        transition: .5s;
        &:hover {
            color: $primary-color-light;
        }
    }
    .event_card .card-content .row {
        margin-bottom: 0;
    }

	.no_historic {
		padding: 1em;
		margin-top: -10px;
		font-style: italic;
	}
</style>