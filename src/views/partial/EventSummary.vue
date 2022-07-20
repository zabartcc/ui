<template>
    <div class="card" v-if="!events || !events.length">
        <div class="card-content">
            <span class="card-title">Upcoming Events</span>
			<div class="loading_container" v-if="!events">
			<Spinner />
		</div>
		<p v-else-if="events && !events.length" class="no_event">There are no upcoming events</p>
        </div>
	</div>
	<div v-if="events && events.length">
		<div class="card event_card" v-for="event in events" :key="event.id">
			<img :src="`https://zabartcc.sfo3.digitaloceanspaces.com/events/${event.bannerUrl}`" class="event_banner" draggable="false" alt="" />
			<div class="card-content">
				<div class="row">
					<div class="col s12 l8">
						<span class="card-title event_title">{{ event.name }}</span>
						<span class="card-title event_date">{{ dtLong(event.eventStart) }} <i class="material-icons rotate tiny">airplanemode_active</i> {{ formatTime(event.eventEnd) }}z</span>
					</div>
                    <div class="col s12 l4">
                        <router-link :to="`/events/${event.url}`" class="btn btn-signup waves-effect waves-light right">More Info &amp; Sign Up</router-link>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	name: 'Events',
	data() {
		return {
			events: null
		};
	},
	async mounted() {
		await this.getUpcomingEvents();
	},
	methods: {
		async getUpcomingEvents() {
			const { data } = await zabApi.get('/event');
			this.events = data.data;
		},
		formatTime(value) {
			const d = new Date(value);
			return d.toLocaleString('en-us', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false });
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
	margin-top: -1em;
	font-style: italic;
}


.event_desc {
	white-space: pre-wrap;
}
</style>