<template>
	<div>
		<div class="card home_intro">
			<div class="card-content">
				<span class="card-title">Welcome to Albuquerque ARTCC</span>
				<p>
					Hello, and welcome to the Albuquerque ARTCC. We are a group of aviation enthusiasts providing simulated ATC services, operating on the VATSIM network, the Americas region and the VATUSA division. The Albuquerque ARTCC covers most of Arizona and New Mexico as well as parts of Texas, Colorado and Oklahoma.
				</p>
				<div class="visit" v-if="!user.isLoggedIn || (!user.data.vis && !user.data.isMem)">
					<p>
						If you would like to become a visitor, please click the button below.
					</p>
					<router-link to="/controllers/visit" class="btn btn-waves">Become a Visitor</router-link>
				</div>
			</div>
		</div>
		<EventSummary />
		<NewsSummary />
		<WeatherInfo />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import WeatherInfo from '../partial/WeatherInfo.vue';
import NewsSummary from '../partial/NewsSummary.vue';
import EventSummary from '../partial/EventSummary.vue';

export default {
	title: "Home",
	components: {
		NewsSummary,
		WeatherInfo,
		EventSummary
	},
	computed: {
		...mapState('user', [
			'user'
		])
	}
};
</script>

<style scoped lang="scss">
.visit {
	margin-top: 1em;
	text-align: center;

	p {
		text-align: left;
	}

	.btn {
		margin-top: 1em;
	}
}
</style>