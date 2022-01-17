<template>
	<div class="pilot">
		<span class="pilot_details"><strong class="text-xl text-black">{{ pilot.callsign }}</strong>{{ pilot.aircraft }}</span>
		<span>{{ pilot.dep }} - {{ pilot.dest }}</span>
		<div class="flight_info">
			<h6>Flight Details - {{ pilot.callsign }}</h6>
			<p>{{ pilot.route || '—' }}</p>
			<p class="remarks">{{ pilot.remarks || '—' }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "PilotOnlineItem",
	props: ['pilot']
};
</script>

<style scoped lang="scss">
.pilot {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	position: relative;
	transition: background-color .3s ease;

	&:nth-of-type(2n) {
		background: rgba(242, 242, 242, 0.5);
	}

	&:hover {
		background: #eaeaea;

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
		padding-right: 5px;
	}
}

.flight_info {
	left: 50%;
	position: absolute;
	transform: translateX(-50%);
	top: calc(100% + 10px);
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.3s;
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

</style>