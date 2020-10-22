<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">
				Who's Online?
			</span>
		</div>
		<div class="card-tabs">
			<ul class="tabs tabs-fixed-width">
				<li class="tab"><a href="#atc_online">Controllers</a></li>
				<li class="tab"><a href="#pilots_online">Departures/Arrivals</a></li>
			</ul>
		</div>
		<div id="atc_online">
			<div v-if=atcOnline>
				<AtcOnlineItem v-for="(atc, k) in atcOnline" :key=k :controller="atc" />
			</div>
			<div v-else>
				<h4>No Controllers Currently Online.</h4>
			</div>
			<h6 class="as_of">As Of: {{atcUpdateTime}}</h6>
		</div>
		<div id="pilots_online">
			<div v-if=pilotsOnline>
				<PilotOnlineItem v-for="(pilot, k) in pilotsOnline" :key=k :pilot="pilot" />
			</div>
			<div v-else>
				<h4>No Departures/Arrivals Found.</h4>
			</div>
			<h6 class="as_of">As Of: {{pilotUpdateTime}}</h6>
		</div>
	</div>
</template>

<script>
import axios from '@/helpers/axios.js';
import AtcOnlineItem from './AtcOnlineItem';
import PilotOnlineItem from './PilotOnlineItem';
import { DateTime } from 'luxon';

export default {
	components: {
		AtcOnlineItem,
		PilotOnlineItem
	},
	data () {
		return {
			pilotsOnline: null,
			pilotUpdateTime: 0,
			atcOnline: null,
			atcUpdateTime: 0,
			ratings: null
		};
	},
	methods: {
		getPilotsOnline () {
			axios.get('/pilotonline').then(({ data }) => {
				this.pilotsOnline = data;
				this.pilotUpdateTime = DateTime.utc().toFormat("MMM dd, HH:mm'z'");
			});
		},
		getAtcOnline () {
			axios.get('/atconline').then(({ data }) => {
				this.atcOnline = data;
				this.atcUpdateTime = DateTime.utc().toFormat("MMM dd, HH:mm'z'");
			});
		},
	},
	mounted () {
		this.getPilotsOnline();
		this.getAtcOnline();
		M.Tabs.init(document.querySelectorAll('.tabs'));
	}
};
</script>

<style lang="scss">
.tabs-fixed-width {
	overflow: visible;
}

#atc_online, #pilots_online {
	h4 {
		padding: 15px 10px;
		font-size: 1.25em;
		margin: 0;
	}
}
#atc_online {
	a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		position: relative;

		&:nth-of-type(2n) {
			background: $gray-light
		}

		&:hover {
			background: $gray-mild;
		}
	}

	strong {
		font-weight: 700;
	}
}

#pilots_online {
	.pilot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		position: relative;

		&:nth-of-type(2n) {
			background: $gray-light
		}

		&:hover {
			background: $gray-mild;

			.flight_info {
				opacity: 1;
			}
		}
	}

	.pilot_details {
		color: $gray-medium;

		strong {
			font-size: 1.5em;
			color: $gray-dark;
			font-weight: 700;
			display: block;
		}
	}

	.flight_info {
		left: 50%;
		position: absolute;
		transform: translateX(-50%);
		top: calc(100% + 10px);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s;
		width: calc(100% - 10px);
		z-index: 500;
		background: #fff;
		box-shadow: 0px 0px 10px 0px rgba(#000, 0.5);

		&::before {
			left: 50%;
			transform: translateX(-50%);
			content: "";
			pointer-events: none;
			display: inline-block;
			position: absolute;
			bottom: 100%;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 0 10px 10px 10px;
			border-color: transparent transparent #122049 transparent;
		}

		h6 {
			background: $primary-color;
			padding: 10px;
			color: #fff;
			font-weight: 300;
			margin: 0;
		}

		p {
			padding: 10px;
			margin: 0;

			&.route {
				font-weight: 700;
			}
		}
	}

	.remarks {
		position: relative;
		&::before {
			height: 1px;
			width: calc(100% - 20px);
			background: #999;
			content: "";
			position: absolute;
			top: 0px;
		}
	}
}

.as_of {
	padding: 10px;
	margin-top: 0;
	font-size: 12px;
	color: $secondary-color-dark;
}

#discord_widget {
	min-height: 500px;
}
</style>