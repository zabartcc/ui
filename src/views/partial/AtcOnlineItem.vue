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