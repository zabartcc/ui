<template>
	<div :id="cat" class="col s12">
		<div v-if="docs.length === 0" class="no_files">No documents in this category found.</div>
		<div class="document" v-else v-for="doc in docs" :key="doc.id">
			<router-link :to="`/files/documents/${doc.slug}`" class="button btn"><i class="material-icons">search</i></router-link>
			<div class="title">{{doc.name}}</div>
			<div class="desc">{{doc.description}}</div>
			<div class="info">Updated at {{dtRegionalUS(doc.updatedAt)}}z</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['cat', 'docs']
};
</script>

<style lang="scss" scoped>
.document {
	padding: 1em 1em .5em 1em;
	transition: background-color .3s ease;

	.title {
		font-weight: 700;
		font-size: 1.3rem;
		width: calc(100% - 45px);
	}

	.desc {
		font-size: .9rem;
		width: calc(100% - 45px);
	}

	.button {
		float: right;
		background: $primary-color-light;

		&.btn {
			width: auto;
			padding: 0 .6em;
			color: #fff;
		}
	}

	.info {
		font-size: .8rem;
		margin-top: 5px;
		color: #9e9e9e;
	}

	&:nth-of-type(odd) {
		background: hsla(0,0%,94.9%,.5);
	}

	&:hover {
		background: #eaeaea;
	}
}

.no_files {
	padding: 1.5em 1em;
	font-style: italic;
}
</style>