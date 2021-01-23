<template>
	<div>
		<div class="card home_intro">
			<div class="card-content">
				<span class="card-title">Welcome to Albuquerque ARTCC</span>
				<p>
					Hello, and welcome to the Albuquerque ARTCC. We are a group of aviation enthusiasts providing simulated ATC services, operating on the VATSIM network, the Americas region and the VATUSA division. The Albuquerque ARTCC covers most of Arizona and New Mexico as well as parts of Texas, Colorado and Oklahoma.
				</p>
			</div>
		</div>
		<NewsSummary />
		<WeatherInfo />
	</div>
</template>

<script>
import WeatherInfo from '../partial/WeatherInfo.vue';
import NewsSummary from '../partial/NewsSummary.vue';
export default {
	components: {
		NewsSummary,
		WeatherInfo
	}
};
</script>

<style scoped lang="scss">

</style>