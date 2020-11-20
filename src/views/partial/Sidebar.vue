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
				<div v-if="atcOnline.length">
					<AtcOnlineItem v-for="(atc, k) in atcOnline" :key=k :controller="atc" />
				</div>
				<div v-else>
					<p>There are no controllers online right now.</p>
				</div>
			</div>
		</div>
		<div id="pilots_online">
			<div v-if=pilotsOnline>
				<div v-if="pilotsOnline.length">
					<PilotOnlineItem v-for="(pilot, k) in pilotsOnline" :key=k :pilot="pilot" />
				</div>
				<div v-else>
					<p>There are no departures/arrivals online right now.</p>
				</div>
			</div>
		</div>
		<h6 class="as_of">As Of: {{getZuluTime()}}z</h6>
	</div>
</template>

<script>
import AtcOnlineItem from './AtcOnlineItem';
import PilotOnlineItem from './PilotOnlineItem';
import { SidebarMixin } from '@/mixins/SidebarMixin.js';

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
			ratings: null
		};
	},
	mixins: [SidebarMixin],
	methods: {
		async getOnline() {
			const pilotsOnline = await this.getPilotsOnline();
			const atcOnline = await this.getAtcOnline();
			this.pilotsOnline = pilotsOnline;
			this.atcOnline = atcOnline;
			this.getZuluTime(); // update time when refreshing who's online
		},
		getZuluTime() {
			return new Date().toLocaleString('en-US', {month: 'short', day: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		}
	},
	mounted() {
		M.Tabs.init(document.querySelectorAll('.tabs'));
		this.getOnline();
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