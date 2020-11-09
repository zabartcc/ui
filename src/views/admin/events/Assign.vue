<template>
	<div class="card">
		<div class="card-content" v-if="event">
			<span class="card-title">Event Signups</span>
			<div class="no_signups" v-if="event.signups.length == 0">There have been no sign ups for this event yet.</div>
			<div class="signups_container" v-else>
				<div class="signups_user card" v-for="signup in event.signups" :key="signup.id">
					<div class="signups_name">{{`${signup.user.fname} ${signup.user.lname}`}}</div>
					<div class="signups_rating">{{signup.user.ratingLong}}</div>
					<div class="signups_prefs">
						<div class="prefs_title">Preferences</div>
						<div class="chip" v-for="(request, i) in signup.requests" :key="`${i}-${request}`">
							{{request}}
						</div>
					</div>
					<div class="signups_assignment">
						<label>Assignment</label>
						<select class="browser-default">
							<option selected disabled>Select one</option>
							<option v-for="position in filterPos(signup.user.certifications)" :key="position.id" :value="position.pos">{{position.pos}}</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="card-content loading" v-else>
			<h5>Loading event sign ups...</h5>
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { EventsMixin } from '@/mixins/EventsMixin.js';

export default {
	data() {
		return {
			event: null
		};
	},
	mixins: [EventsMixin],
	methods: {
		async getEventData() {
			const data = await this.getPositionsMixin(this.$route.params.slug);
			this.event = data;
		},
		filterPos(/*userCerts*/) {
			//return this.event.positions.filter((pos) => { for(let cert in userCerts) Object.values(cert).includes(pos.ocde); });
			// I need this to return the positions where position.code === (one of the) userCerts.code (userCerts is an array)
		}
	},
	mounted() {
		this.getEventData();
	}
};
</script>

<style scoped lang="scss">

.card-content{ 
	padding: 0;
}

.no_signups {
	font-style: italic;
	padding: 1em;
}

.card-title {
	padding-left: .5em;
	padding-top: .5em;
}

.signups_container {
	display: flex;
	justify-content: center;
	padding: .5em;
}

.signups_user {
	width: 300px;
	padding: 1em;
	margin: .5em;

	.signups_name {
		font-weight: 600;
		font-size: 1.1rem;
	}

	.signups_rating {
		font-weight: 300;
		margin-top: -3px;
	}

	.prefs_title {
		margin-top: 10px;
		color: #9e9e9e;
		font-size: .8rem;
	}

	.signups_assignment {

	}
	.signups_prefs {
		min-height: 92px;

		.chip {
			user-select: none;
		}
	}
}

.loading {
	text-align: center;
}

.progress {
	max-width: 500px;
	margin: 0 auto;
}

</style>