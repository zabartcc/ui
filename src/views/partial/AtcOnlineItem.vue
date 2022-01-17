<template>
	<router-link :to="`/controllers/${controller.cid}`">
		<span><strong>{{ controller.name }}</strong>/{{ controller.ratingShort }}</span>
		<span class="controller_position">{{ controller.pos }}</span>
	</router-link>
</template>

<script>
export default {
	name: "AtcOnlineItem",
	props: ['controller']
};
</script>

<style scoped lang="scss">
a {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	position: relative;
	transition: background-color .3s ease;

	&:nth-of-type(2n) {
		background: $gray-mild;
	}

	&:hover {
		background: #eaeaea;
	}
}

strong {
	font-weight: 700;
}
</style>