<template>
	<div class="card" v-if="!events">
        <div class="card-content">
			<div class="row">
				<div class="card-title col s8"><span class="card-title">Upcoming Events</span></div>
				<div class="card-title col s4"><router-link to="/admin/events/new"><span class="btn new_event_button right">New Event</span></router-link></div>
			</div>
            <span style="font-style: italic;">There are no upcoming events planned.</span>
        </div>
    </div>
	<div class="card" v-else>
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Upcoming Events</span></div>
				<div class="card-title col s4"><router-link to="/admin/events/new"><span class="btn new_event_button right">New Event</span></router-link></div>
			</div>
		</div>
		<table class="event_list striped" v-if=events>
			<thead class="controller_list_head">
				<tr>
					<th>Event</th>
					<th>Date</th>
					<th class="options">Options</th>
				</tr>
			</thead>
			<tbody class="event_list_row">
				<tr v-for="event in events" :key="event.id">
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
						<router-link data-position="top" data-tooltip="Assign Positions" class="tooltipped" :to="`/admin/events/assign/${event.url}`">
							<i class="material-icons">group</i>
						</router-link>
						<a href="#" data-position="top" data-tooltip="Delete Event" class="tooltipped">
							<i class="material-icons">delete</i>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';

export default {
	data() {
		return {
			events: null
		};
	},
	mixins: [EventsMixin],
	methods: {
		async getUpcomingEvents() {
			this.events = await this.getUpcomingEventsMixin();
		},
		format_full(value) {
			var d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false});
		}
	},
	async mounted() {
		this.getUpcomingEvents();
	}
};
</script>

<style scoped lang="scss">
	.new_event_button {
	}

	.name {
		color: $primary-color;
		font-weight: 700;
	}

	.row_no_margin {
		margin-bottom: 0;
	}

	.options {
		text-align: right;
	}

	table tbody {
		tr {
			transition: background-color .3s ease;
			&:hover {
				background: $gray-mild;
			}
		}
	}
</style>