<template>
	<div class="card event_card">
		<div class="loading_container" v-if="!event">
			<Spinner />
		</div>
		<div class="event" v-else>
			<img :src="`${event.bannerUrl.match(/^http/) ? event.bannerUrl : `https://zabartcc.sfo3.digitaloceanspaces.com/events/${event.bannerUrl}`}`" class="event_banner" draggable="false" alt="" />
			<div class="card-content">
				<div class="row">
					<div class="col s12">
						<span class="card-title event_title">{{ event.name }}</span>
						<span class="card-title event_date">{{ dtLong(event.eventStart) }} <i class="material-icons rotate tiny">airplanemode_active</i> {{ formatTime(event.eventEnd) }}z</span>
					</div>
				</div>
				<div class="row">
					<div class="col s12 event_desc">
						{{ event.description }}
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
			event: null,
			chips: null
		};
	},
	async mounted() {
		await this.getEvent();
		this.setTitle(this.event.name);
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	methods: {
		async getEvent() {
			const { data } = await zabApi.get(`/event/${this.$route.params.slug}`);
			if(!data.data) this.$router.push('/events');
			else this.event = data.data;
		},
		formatTime(value) {
			const d = new Date(value);
			return d.toLocaleString('en-us', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		},
	}
};
</script>

<style scoped lang="scss">
.event_banner {
	width: 100%;
}

.event_title {
	font-weight: 600;
}

.event_date {
	font-size: 1.15em; 
	margin-top: -15px;

	.rotate {
		transform: rotate(90deg);
	}
}

.event_desc {
	white-space: pre-wrap;
}
</style>