<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Current Weather</span>
			<p>The runways listed here are suggestions. If there is a controller online, they may be using different runways than those listed here. Please always check with the controller's ATIS prior to planning your runways.</p>
		</div>
		<table v-if="numStationsLoaded === Object.keys(stations).length" class="striped compact">
			<thead>
				<tr>
					<th>Airport</th>
					<th>Wind</th>
					<th>Conditions</th>
					<th>Landing</th>
					<th>Departing</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="station in stations" :key="station.icao">
					<td><span class="hide-on-med-and-down">{{station.fullName}} <strong>({{station.icao}})</strong></span><span class="hide-on-large-only">{{station.icao}}</span></td>
					<td>{{formatWind(station)}}</td>
					<td><span class="airport_conditions" v-html="getConditions(station)"></span></td>
					<td>{{station.getLanding()}}</td>
					<td>{{station.getDeparting()}}</td>
				</tr>
			</tbody>
		</table>
		<div class="card-content loading" v-else>
			<h5>Loading weather...</h5>
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import parse from 'metar-parser';

export default {
	data() {
		return {
			stations: {
				KPHX: {
					icao: "KPHX",
					fullName: "Phoenix Sky Harbor International Airport",
					metar: null, 
					parsedMetar: null,
					configs: {
						landing: {
							W: '25L/26',
							E: '7R/8'
						}, 
						departing: {
							W: '25R',
							E: '7L'
						}
					},
					getLanding: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							if(this.parsedMetar.time.hour >= 7 && this.parsedMetar.time.hour <= 18) { // morning
								return this.configs.landing.E;
							} else {
								return this.configs.landing.W;
							}
						} else {
							if(this.parsedMetar.wind.direction > 0 && this.parsedMetar.wind.direction <=180) {
								return this.configs.landing.E;
							} else {
								return this.configs.landing.W;
							}
						}
					},
					getDeparting: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							if(this.parsedMetar.time.hour >= 7 && this.parsedMetar.time.hour <= 18) { // morning
								return this.configs.departing.E;
							} else {
								return this.configs.departing.W;
							}
						} else {
							if(this.parsedMetar.wind.direction > 0 && this.parsedMetar.wind.direction <=180) {
								return this.configs.departing.E;
							} else {
								return this.configs.departing.W;
							}
						}
					}
				} ,
				KABQ: {
					icao: "KABQ",
					fullName: "Albuquerque International Sunport",
					metar: null, 
					parsedMetar: null,
					configs: {
						landing: {
							E: '3/8',
							W: '21/26',
						}, 
						departing: {
							E: '8',
							W: '21/26',
						}
					},
					getLanding: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							return this.configs.landing.E;
						} else {
							if(this.parsedMetar.wind.direction > 150 && this.parsedMetar.wind.direction <=350) {
								return this.configs.landing.W;
							} else {
								return this.configs.landing.E;
							}
						}
					},
					getDeparting: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							return this.configs.departing.E;
						} else {
							if(this.parsedMetar.wind.direction > 150 && this.parsedMetar.wind.direction <=350) {
								return this.configs.departing.W;
							} else {
								return this.configs.departing.E;
							}
						}
					}
				}, 
				KTUS: {
					icao: "KTUS",
					fullName: "Tucson International Airport",
					metar: null, 
					parsedMetar: null,
					configs: {
						landing: {
							NW: '29R',
							SE: '11L',
						}, 
						departing: {
							NW: '29R',
							SE: '11L',
						}
					},
					getLanding: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							return this.configs.landing.SE;
						} else {
							if(this.parsedMetar.wind.direction > 20 && this.parsedMetar.wind.direction <= 200) {
								return this.configs.landing.SE;
							} else {
								return this.configs.landing.NW;
							}
						}
					},
					getDeparting: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							return this.configs.departing.SE;
						} else {
							if(this.parsedMetar.wind.direction > 20 && this.parsedMetar.wind.direction <= 200) {
								return this.configs.departing.SE;
							} else {
								return this.configs.departing.NW;
							}
						}
					}
				}, 
				KELP: {
					icao: "KELP",
					fullName: "El Paso International Airport",
					metar: null, 
					parsedMetar: null,
					configs: {
						landing: {
							SE: '22',
							SW: '22/26L',
							NE: '4/8R',
						}, 
						departing: {
							SE: '8R/22',
							SW: '22',
							NE: '4/8R',
						}
					},
					getLanding: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							return this.configs.landing.SE;
						} else {
							if(this.parsedMetar.wind.direction >= 0 && this.parsedMetar.wind.direction < 130) {
								return this.configs.landing.SW;
							} else if(this.parsedMetar.wind.direction >= 130 && this.parsedMetar.wind.direction < 310) {
								return this.configs.landing.NE;
							} else {
								return this.configs.landing.SE;
							}
						}
					},
					getDeparting: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							return this.configs.departing.SE;
						} else {
							if(this.parsedMetar.wind.direction >= 0 && this.parsedMetar.wind.direction < 130) {
								return this.configs.departing.SW;
							} else if(this.parsedMetar.wind.direction >= 130 && this.parsedMetar.wind.direction < 310) {
								return this.configs.departing.NE;
							} else {
								return this.configs.departing.SE;
							}
						}
					}
				}, 
				KAMA: {
					icao: "KAMA",
					fullName: "Rick Husband Amarillo International Airport",
					metar: null, 
					parsedMetar: null,
					configs: {
						landing: {
							NE: '4',
							SW: '22',
						}, 
						departing: {
							NE: '4',
							SW: '22',
						}
					},
					getLanding: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							return this.configs.landing.NE;
						} else {
							if(this.parsedMetar.wind.direction >= 130 && this.parsedMetar.wind.direction < 310) {
								return this.configs.landing.SW;
							} else {
								return this.configs.landing.NE;
							}
						}
					},
					getDeparting: function() {
						if(this.parsedMetar.wind.speedKt <= 6) {
							return this.configs.departing.NE;
						} else {
							if(this.parsedMetar.wind.direction >= 130 && this.parsedMetar.wind.direction < 310) {
								return this.configs.departing.SW;
							} else {
								return this.configs.departing.NE;
							}
						}
					}
				}
			},
			numStationsLoaded: 0
		};
	},
	methods: {
		async getWeatherForAirport(icao) {
			const { data } = await axios.get(`/metar/metar.php?id=${icao}`);
			this.stations[icao].metar = data;
			this.stations[icao].parsedMetar = parse(this.stations[icao].metar);
			this.numStationsLoaded++;
			
		},
		formatWind: function(station) {
			if(station.parsedMetar.wind.speedKt < 3) return 'Calm';
			else if(!('speedKt' in station.parsedMetar.wind)) return 'Unknown';
			const paddedWind = `0${station.parsedMetar.wind.direction}`.slice(-3);
			return `${paddedWind}@${station.parsedMetar.wind.speedKt}`;
		},
		getConditions: function(station) {
			return (station.parsedMetar.visibility.miles > 3) ? `<i class="material-icons">wb_sunny</i>VFR` : `<i class="material-icons">wb_cloudy</i>IFR`;
		}
	},
	computed: {
	},
	async mounted() {
		for(const station of Object.keys(this.stations)) {
			await this.getWeatherForAirport(station);
		}
	}

};
</script>

<style scoped lang="scss">
.airport_conditions {
	display: inline-flex;
	align-items: center;

	&::v-deep i {
		margin-right: 5px;
	}
}
.loading {
	text-align: center;
}

.progress {
	max-width: 500px;
	margin: 0 auto;
}

tbody tr {
	transition: background-color .3s ease;
	&:hover {
		background-color: $gray-mild!important;
	}
}
</style>