<template>
	<div class="card">
		<div class="loading_container" v-if="!news">
			<Spinner />
		</div>
		<div v-else>
			<div class="card-content">
				<div class="row row_no_margin">
					<div class="col s12 l10 card-title">{{ news.title }}</div>
					<div class="col s12 author">
						By {{ news.user.fname }} {{ news.user.lname }} on {{ dLong(news.createdAt) }}
					</div>
				</div>
				<div id="news_content"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default {
	data() {
		return {
			news: null,
			viewer: null
		};
	},
	async mounted() {
		await this.getArticle();
		this.setTitle(this.news.title);

		this.$nextTick(() => {
			this.viewer = new Viewer({
				el: document.getElementById('news_content'),
				height: '600px',
				initialValue: this.news.content
			});
		});
	},
	methods: {
		async getArticle() {
			const { data } = await zabApi.get(`/news/${this.$route.params.slug}`);
			this.news = data.data;
		},
	}

};
</script>

<style lang="scss" scoped>
.card-title {
	font-weight: bold;
	margin-bottom: 0!important;
}

.side-title {
	margin-top: .4em;
}

.author {
	font-weight: 400;
	color: #9e9e9e;
}

#news_content {
	width: 100%;
	margin-top: 1em;
	counter-reset: h2;
	overflow: auto;

	&:deep(.tui-editor-contents) {
		font-family: "Lato", "Helvetica", sans-serif;
		font-size: 1rem;
	}

	&:deep(code) {
		background-color: $gray_light;
		padding: 0.125em;
		color: $secondary-color-dark;
	}

	&:deep(h2) {
		counter-reset: h3;
		font-size: 2em;
		border-bottom: none;
		font-weight: 400;
		color: #000;
		margin-bottom: .25em;

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
		font-weight: 400;
		color: #000;

		&::before {
			counter-increment: h3;
			content: counter(h2) "." counter(h3) ". "
		}
	}

	&:deep(h4) {
		counter-reset: h5;
		margin-bottom: 10px;
		font-size: 1.5em;
		font-weight: 400;
		line-height: 110%;
		margin: 1.52rem 0 .912rem 0;
		color: #000;

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
		color: #000;
		font-weight: 400;

		&::before {
			counter-increment: h5;
			content: counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
		}
	}

	&:deep(p) {
		color: #000;
		&+p {
			margin-top: 1.5em;
		}
	}

	&:deep(ul) {
		color: #000;

		li {
			list-style: disc outside;
			margin-left: 2em;

			&::before {
				background-color: #000;
				content: normal;
			}
		}
	}
	
	&:deep(ol) {
		color: #000;

		li {
			&::before {
				color: #000;
			}
		}
	}

	&:deep(a) {
		text-decoration: underline;
	}

	&:deep(table) {
		width: 100%;
		display: table;
		border-collapse: collapse;
		border: none;
		border-spacing: 0;
		color: #000;
	}

	&:deep(thead) {
		border-bottom: 1px solid #666;
	}

	&:deep(tbody) {
		display: table-row-group;
		vertical-align: middle;
		border-color: inherit;
	}

	&:deep(tr) {
		border-bottom: none;
	}

	&:deep(tr:nth-child(odd)) {
		background-color: rgba(242, 242, 242, 0.5);
	}

	&:deep(td) {
		padding: 0.25em 1em !important;
		border: none;
	}

	&:deep(th) {
		background-color: #fff;
		color: #000;
		border: none;
		font-weight: 700;
	}
}
</style>