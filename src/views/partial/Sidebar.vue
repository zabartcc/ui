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
			<div v-if="!atcOnline" class="loading_container">
				<Spinner />
			</div>
			<div v-else-if="atcOnline && atcOnline.length > 0">
				<AtcOnlineItem v-for="(atc, k) in atcOnline" :key=k :controller="atc" />
			</div>
			<div v-else>
				<p>There are no controllers online right now.</p>
			</div>
		</div>
		<div id="pilots_online">
			<div v-if="!pilotsOnline" class="loading_container">
				<Spinner />
			</div>
			<div v-else-if="pilotsOnline && pilotsOnline.length > 0">
				<PilotOnlineItem v-for="(pilot, k) in depsArrs" :key=k :pilot="pilot" />
			</div>
			<div v-else>
				<p>There are no departures/arrivals online right now.</p>
			</div>
		</div>
		<p class="as_of">As Of: {{getZuluTime()}}z</p>
	</div>
</template>

<script>
import AtcOnlineItem from './AtcOnlineItem';
import PilotOnlineItem from './PilotOnlineItem';
import {zabApi} from '@/helpers/axios.js';

export default {
	components: {
		AtcOnlineItem,
		PilotOnlineItem
	},
	data() {
		return {
			pilotsOnline: null,
			updateTime: '',
			atcOnline: null,
			ratings: null,
			airports: ["KPHX", "KABQ", "KTUS", "KAMA", "KROW", "KELP", "KSDL", "KCHD", "KFFZ", "KIWA", "KDVT", "KGEU", "KGYR", "KLUF", "KRYN", "KDMA", "KFLG", "KPRC", "KAEG", "KBIF", "KHMN", "KSAF", "KFHU"]
		};
	},
	async mounted() {
		M.Tabs.init(document.querySelectorAll('.tabs'));
		await this.getOnline();
	},
	methods: {
		async getOnline() {
			const {data} = await zabApi.get('/online');
			this.pilotsOnline = data.data.pilots;
			this.atcOnline = data.data.atc;
			await this.getZuluTime(); // update time when refreshing who's online
		},
		getZuluTime() {
			return new Date().toLocaleString('en-US', {month: 'short', day: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		}
	},
	computed: {
		depsArrs() {
			return this.pilotsOnline.filter(flight => {
				return this.airports.includes(flight.dep) || this.airports.includes(flight.dest);
			});
		}
	}
};
</script>

<style scoped lang="scss">
.tabs-fixed-width {
	overflow: visible;
}

#atc_online, #pilots_online {
	p {
		padding: 15px 10px;
		margin: 0;
		font-style: italic;
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