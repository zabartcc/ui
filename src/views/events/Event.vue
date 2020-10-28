<template>
	<div class="row" v-if="event">
		<div class="col s12">
			<div class="card event-card">
				<img :src="event[0].bannerUrl" class="event-banner" draggable="false" />
				<div class="card-content">
					<div class="row">
						<div class="col s12">
							<span class="card-title event-title">{{event[0].name}}</span>
							<span class="card-title event-date">{{format_full(event[0].eventStart)}}z ✈ {{format_hour(event[0].eventEnd)}}z</span>
						</div>
					</div>
					<div class="row">
						<div class="col s12">
							{{event[0].description}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col l5">
			<div id="assignment-modal" class="modal">
				<div class="modal-content">
					<h4>Sign up</h4>
					<p>Please click on the button below to sign up for this event. You may also make up to three position requests using the form below; if you have no position request, leave the form blank. Pleas note that position requests are just that, requests. ZAB Staff members reserve the right to assign positions for any reason.</p>
					<div class="chips chips-autocomplete chips-placeholder"></div>
				</div>
				<div class="modal-footer">
					<a href="#" class="waves-effect waves-light btn" @click="form_success" >SIGN UP</a>
					<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';

export default {
	name: 'Events',
	data() {
		return {
			event: null
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
			this.event = await this.getEventByIdMixin(this.$route.params.id);
		},
		format_full(value) {
			var d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		},
		format_hour(value) {
			var d = new Date(value);
			return d.toLocaleString('en-us', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		},
		form_success() {
			M.toast({
				html: '<div><i class="material-icons">check</i> Success! You have been signed up for this event.</div>',
				displayLength: 5000,
				classes: 'toast-success green'
			});
			M.toast({
				html: '<div><i class="material-icons">error</i> Oops... Something went wrong. Please try again.</div>',
				displayLength: 5000,
				classes: 'toast-fail red'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.event-banner {
	width: 100%;
}

.event-title {
	font-weight: 600;
}

.event-date {
	font-size: 1.15em; 
	margin-top: -15px;
}

.chips {
	height: 30px;
}

#assignment-modal {
	min-width: 400px;
	width: 600px;
}

.modal-footer {
	padding-left: 20px;
}

.chips.focus {
	border-bottom: 1px solid $primary-color-light;
	box-shadow: 0 1px 0 0 $primary-color-light;
}
</style>