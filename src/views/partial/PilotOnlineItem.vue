<template>
	<div class="pilot">
		<span class="pilot_details"><strong class="text-xl block text-black">{{pilot.callsign}}</strong>{{pilot.aircraft}}</span>
		<span>{{pilot.dep}} - {{pilot.dest}}</span>
		<div class="flight_info">
			<h6>Flight Details - {{pilot.callsign}}</h6>
			<p>{{pilot.route}}</p>
			<p class="remarks">{{pilot.remarks}}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "PilotOnlineItem",
	props: ['pilot']
};
</script>