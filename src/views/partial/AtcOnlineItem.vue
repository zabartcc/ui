<template>
	<a :href="`/controllers/${controller.cid}`">
		<span><strong>{{controller.name}}</strong>/{{controller.ratingShort}}</span>
		<span class="controller_position">{{controller.pos}}</span>
	</a>
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
</style>