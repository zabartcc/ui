<template>
	<div class="card" v-if=document>
		<div class="card-content">
			<span class="card-title">
				{{document.name}}

			</span>
			<div class="document_date">
				{{dtLong(document.updatedAt)}}
			</div>
			<div class="document_content" v-html="document.content">
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import showdown from 'showdown';

export default {
	data() {
		return {
			document: null
		};
	},
	async mounted() {
		await this.getDocument();
	},
	methods: {
		async getDocument() {
			const {data} = await zabApi.get(`/file/documents/${this.$route.params.slug}`);
			this.document = data.data;
			const converter = new showdown.Converter();
			converter.setOption('tables', true);
			converter.setOption('strikethrough', true);
			this.document.content = converter.makeHtml(this.document.content);
		},
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
		width: 100%;
		margin-top: 1em;
		white-space: pre;
		word-break: break-all;
	}

	.document_content {
		
		counter-reset: h2;
		overflow: auto;

		&:deep(code) {
			background: $gray_light;
			padding: 0.125em;
			color: $secondary-color-dark;
		}

		&:deep(h2) {
			counter-reset: h3;
			font-size: 2em;

			&:first-of-type {
				margin-top: 0;
			}

			&::before {
				counter-increment: h2;
				content: counter(h2) ". "
			}
		}

		&:deep(h3) {
			counter-reset: h4;
			margin-bottom: 10px;
			font-size: 1.75em;

			&::before {
				counter-increment: h3;
				content: counter(h2) "." counter(h3) ". "
			}
		}

		&:deep(h4) {
			counter-reset: h5;
			margin-bottom: 10px;
			font-size: 1.5em;

			&::before {
				counter-increment: h4;
				content: counter(h2) "." counter(h3) "." counter(h4) ". "
			}
		}

		&:deep(h5) {
			margin-bottom: 10px;
			border-bottom: none;
			font-style: normal;
			font-size: 1.25em;

			&::before {
				counter-increment: h5;
				content: counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
			}
		}

		&:deep(p) {
			&+p {
				margin-top: 1.5em;
			}
		}

		&:deep(ul) {

			li {
				list-style: disc outside;
				margin-left: 2em;
			}
		}

		&:deep(a) {
			text-decoration: underline;
		}
	}

</style>