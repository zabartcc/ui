<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Upcoming Events</span></div>
				<div class="col s4"><router-link to="/admin/events/new"><span class="btn new_event_button right">New</span></router-link></div>
			</div>
		</div>
		<div class="loading_container" v-if="!events">
			<Spinner />
		</div>
		<p class="no_event" v-else-if="events && events.length == 0">There are no upcoming events</p>
		<table class="event_list striped" v-else>
			<thead class="controller_list_head">
				<tr>
					<th>Name</th>
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
						{{dtLong(event.eventStart)}}
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
							<h4>Delete Event?</h4>
							<p>This will delete the event and all information associated to it. Events should not be deleted unless they were canceled. If you are unsure, click cancel.</p>
						</div>
						<div class="modal-footer">
							<a href="#!" class="modal-close waves-effect waves-light btn" @click="deleteEvent(event.url)">Delete</a>
							<a href="#!" class="modal-close waves-effect waves-light btn-flat">Cancel</a>
						</div>
					</div>
				</tr>
			</tbody>
		</table>
	</div>
	<Past />
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import Past from './Past.vue';

export default {
	name: 'Events',
	title: 'Events',
	data() {
		return {
			events: null,
			historicEvents: null
		};
	},
	components: {
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
			const {data} = await zabApi.get('/event');
			this.events = data.data;
		},
		async deleteEvent(slug) {
			try {
				const {data} = await zabApi.delete(`/event/${slug}`);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Event deleted');
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
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

table tbody {
	tr {
		transition: background-color .3s ease;
		&:hover {
			background: #eaeaea;
		}
	}
}

.no_event {
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

.modal_delete {
	min-width: 400px;
	width: 30%;
}
</style>