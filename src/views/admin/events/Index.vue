<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Upcoming Events</span></div>
				<div class="card-title col s4"><router-link to="/admin/events/new"><span class="btn new_event_button right">New Event</span></router-link></div>
			</div>
		</div>
		<div class="loading_container" v-if="!events">
			<Spinner />
		</div>
		<p class="no_event" v-else-if="events && events.length == 0">There are no upcoming events planned right now.</p>
		<table class="event_list striped" v-else>
			<thead class="controller_list_head">
				<tr>
					<th>Event</th>
					<th>Date</th>
					<th class="options">Options</th>
				</tr>
			</thead>
			<tbody class="event_list_row">
				<tr v-for="(event, i) in events" :key="event.id">
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
						<a :href="`#modal_delete_${i}`" data-position="top" data-tooltip="Delete Event" class="tooltipped modal-trigger">
							<i class="material-icons red-text text-darken-2">delete</i>
						</a>
					</td>
					<div :id="`modal_delete_${i}`" class="modal modal_delete">
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
	</div>
	<Past />
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';
import Past from './Past.vue';
import Spinner from '@/components/Spinner.vue';

export default {
	data() {
		return {
			events: null,
			historicEvents: null
		};
	},
	mixins: [EventsMixin],
	components: {
		Spinner,
		Past
	},
	async mounted() {
		await this.getUpcomingEvents();
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getUpcomingEvents() {
			this.events = await this.getUpcomingEventsMixin();
		},
		format_full(value) {
			var d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false});
		},
		async deleteEvent(slug) {
			const success = await this.deleteEventMixin(slug).catch(() => {
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Unable to delete event. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});
				return false;
			});
			if(success) {
				M.toast({
					html: '<i class="material-icons left">done</i> Event deleted successfully. <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				await this.getUpcomingEvents();
				setTimeout(() => M.Modal.getInstance(document.querySelector('.modal_delete')).close(), 500);
			}
		}
	}
};
</script>

<style scoped lang="scss">
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
			background: #eaeaea;
		}
	}
}

.no_event {
	padding: 1em;
	margin-top: -10px;
	font-style: italic;
}

.modal_delete {
	min-width: 400px;
	width: 30%;
}
</style>