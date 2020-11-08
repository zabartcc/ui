<template>
	<div class="row" v-if="event">
		<div class="col s12">
			<div class="card event_card">
				<img :src="require(`@/assets/uploads/events/${event.bannerUrl}`)" class="event_banner" draggable="false" />
				<div class="card-content">
					<div class="row">
						<div class="col s12">
							<span class="card-title event_title">{{event.name}}</span>
							<span class="card-title event_date">{{formatFull(event.eventStart)}}z ✈ {{formatHour(event.eventEnd)}}z</span>
						</div>
					</div>
					<div class="row">
						<div class="col s12 event_desc">
							{{event.description}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="card" v-else>
		<div class="card-content">
			<span class="card-title">Oops!</span>
			We couldn't find that event.
		</div>
	</div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';

export default {
	name: 'Events',
	data() {
		return {
			event: null,
			chips: null
		};
	},
	mixins: [EventsMixin],
	mounted() {
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		this.getEvent();
	},
	methods: {
		async getEvent() {
			this.event = await this.getEventMixin(this.$route.params.slug);
		},
		formatFull(value) {
			var d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		},
		formatHour(value) {
			var d = new Date(value);
			return d.toLocaleString('en-us', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		},
	}
};
</script>

<style lang="scss">
.assignment_modal {

	.dropdown-content {
		width:auto !important;
	}
}
</style>

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
}

.event_desc {
	white-space: pre-wrap;
}

</style>