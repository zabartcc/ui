<template>
	<div class="card" v-if=document>
		<div class="card-content">
			<span class="card-title">
				{{document.name}}

			</span>
			<div class="document_date">
				{{formatDate(document.updatedAt)}}z
			</div>
			<div class="document_content">
				{{document.content}}
			</div>
		</div>
	</div>
</template>

<script>
import { FileMixin } from '@/mixins/FileMixin.js';

export default {
	data() {
		return {
			document: null
		};
	},
	mixins: [FileMixin],
	async mounted() {
		await this.getDocument();
	},
	methods: {
		async getDocument() {
			this.document = await this.getSingleDocumentMixin(this.$route.params.slug);
		},
		formatDate(date) {
			return new Date(date).toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		}
	}
};
</script>

<style scoped lang="scss">
	.document_date {
		margin-top: -10px;
		color: rgba(0,0,0,.42);
		font-size: .9rem;
	}
	.document_content {
		margin-top: 1em;
	}
</style>