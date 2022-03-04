<template>
	<div class="card">
		<div class="card-content">
			<div class="card-title">Training Requests</div>
			<div class="loading_container" v-if="loading">
				<Spinner />
			</div>
			<div class="calendar_wrapper" v-else>
				<div class="calendar z-depth-2">
					<div class="calendar_top">
						<div class="days z-depth-1">
							<div>Sunday</div>
							<div>Monday</div>
							<div>Tuesday</div>
							<div>Wednesday</div>
							<div>Thursday</div>
							<div>Friday</div>
							<div>Saturday</div>
						</div>
					</div>
					<div class="calendar-body">
						<div class="week">
							<router-link :to="`/ins/training/requests/${urlSafeDate(date.date)}`" :class="`day ${date.requests.length ? 'has_request' : ''}`" v-for="date in dates.slice(0,7)" :key="date.date">
								<div class="week_date">
									<span :class="[((new Date(date.date).getTime()) - (new Date().getTime()) < 0 ? 'past_date' : ''), (new Date(new Date().getTime()).getUTCDate() === new Date(date.date).getUTCDate() ? 'current_date' : '')]">
										{{ new Date(date.date).toUTCString().slice(5, 11) }}
									</span>
								</div>
								<div :class="`date_requests ${(new Date(Date.UTC(date.date)).getTime()) - (new Date().getTime()) < 0 ? 'past' : ''}`" v-if="date.requests.length">
									{{ date.requests.length }} request<span v-if="date.requests.length > 1">s</span>
								</div>
							</router-link>
						</div>
						<div class="week">
							<router-link :to="`/ins/training/requests/${urlSafeDate(date.date)}`" :class="`day ${date.requests.length ? 'has_request' : ''}`" v-for="date in dates.slice(7,14)" :key="date.date">
								<div class="week_date">
									{{ new Date(date.date).toUTCString().slice(5, 11) }}
								</div>
								<div class="date_requests" v-if="date.requests.length">
									{{ date.requests.length }} request<span v-if="date.requests.length > 1">s</span>
								</div>
							</router-link>
						</div>
						<div class="week">
							<router-link :to="`/ins/training/requests/${urlSafeDate(date.date)}`" :class="`day ${date.requests.length ? 'has_request' : ''}`" v-for="date in dates.slice(14)" :key="date.date">
								<div class="week_date">
									{{ new Date(date.date).toUTCString().slice(5, 11) }}
								</div>
								<div class="date_requests" v-if="date.requests.length">
									{{ date.requests.length }} request<span v-if="date.requests.length > 1">s</span>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';

export default {
	name: 'TrainingRequests',
	title: 'Training Requests',
	data() {
		return {
			dates: [],
			days: 21,
			loading: true
		};
	},
	async mounted() {
		await this.calculateDates();
		await this.getRequests();
	},
	methods: {
		async getRequests() {
			try {
				const { data } = await zabApi.get('/training/request/open', {
					params: {
						period: 21 // 21 days from start of week
					}
				});

				for(const request of data.data) {
					for(const date of this.dates) {
						if(date.date.slice(0,10) === new Date(request.startTime).toISOString().slice(0, 10)) date.requests.push(request);
					}
				}
				this.loading = false;
			} catch(e) {
				console.log(e);
			}
		},
		calculateDates() {
			const d = new Date((new Date()).toISOString()),
				currentDay = d.getDay(),
				diff = d.getDate() - currentDay,
				startOfWeek = d.setDate(diff);
			
			for(let i = 0; i < this.days; i++) {
				this.dates.push({
					"date": (new Date(startOfWeek + (i * 1000 * 60 * 60 * 24)).toISOString()),
					"requests": []
				});
			}
		},
		urlSafeDate(date) {
			return (new Date(date)).toISOString().slice(0,10).replace(/-/g, '');
		} 
	}
};
</script>

<style scoped lang="scss">
.calendar_title {
	font-size: 1.8rem;
	font-weight: 300;
	text-align: center;
	margin-top: -10px;
	margin-bottom: 10px;
}

.calendar_wrapper {
	margin-top: 1em;
	padding: .25em;
}

.calendar {
	display: flex;
	overflow: auto;
	flex-direction: column;
	
	.week {
		display: flex;

		.day {
			display: block;
			width: 14.285%;
			min-width: 90px;
			height: 5em;
			padding: .4em;
			text-align: right;
			border-bottom: 1px solid $gray_light;
			transition: .3s ease;

			&+.day {
				border-left: 1px solid $gray_light;
			}

			&:hover {
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .20);
			}

			.current_date {
				background-color: $primary-color-light;
				color: #fff!important;
				padding: .2em .5em;
				border-radius: 1em;
			}

			.past_date {
				color: #9e9e9e;
			}

			.date_requests {
				text-align: center;
				font-size: .9rem;
				color: $secondary-color-dark;
				margin-top: .5em;

				&.past {
					color: $secondary-color-light;
				}
			}
		}
	}

	.days {
		display: flex;
		
		div {
			background: $primary-color-light;
			color: #fff;
			width: 14.285%;
			min-width: 90px;
			padding: .4em;
			text-align: center;
		}
	}
}

</style>