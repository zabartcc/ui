<template>
	<div class="card card_documents">
		<div class="card-content">
			<span class="card-title">Documents</span>
		</div>
		<div class="row">
			<div class="col s12">
				<ul class="tabs">
					<li class="tab col s6 l3"><a class="active" href="#agreements">Agreements</a></li>
					<li class="tab col s6 l2"><a href="#sop">SOP</a></li>
					<li class="tab col s7 l3"><a href="#policies">Policies</a></li>
					<li class="tab col s6 l4"><a href="#misc">Miscellaneous</a></li>
				</ul>
			</div>
			<div class="loading_container loading_files" v-if="documents === null">
				<Spinner />
			</div>
			<div class="tabs_content" v-else>
				<div id="agreements" class="col s12">
					<div v-if="loaDocuments.length == 0" class="no_files">No documents in this category found.</div>
					<div class="document" v-else v-for="doc in loaDocuments" :key="doc.id">
						<div class="title">{{doc.name}}</div>
						<router-link :to="`/files/documents/${doc.slug}`" class="button btn"><i class="material-icons">search</i></router-link>
						<div class="desc">{{doc.description}}</div>
						<div class="info">Updated at {{formatDate(doc.updatedAt)}}z</div>
					</div>
				</div>
				<div id="sop" class="col s12">
					<div v-if="sopDocuments.length == 0" class="no_files">No documents in this category found.</div>
					<div class="document" v-else v-for="doc in sopDocuments" :key="doc.id">
						<div class="title">{{doc.name}}</div>
						<router-link :to="`/files/documents/${doc.slug}`" class="button btn"><i class="material-icons">search</i></router-link>
						<div class="desc">{{doc.description}}</div>
						<div class="info">Updated at {{formatDate(doc.updatedAt)}}z</div>
					</div>
				</div>
				<div id="policies" class="col s12">
					<div v-if="policyDocuments.length == 0" class="no_files">No documents in this category found.</div>
					<div class="document" v-else v-for="doc in policyDocuments" :key="doc.id">
						<div class="title">{{doc.name}}</div>
						<router-link :to="`/files/documents/${doc.slug}`" class="button btn"><i class="material-icons">search</i></router-link>
						<div class="desc">{{doc.description}}</div>
						<div class="info">Updated at {{formatDate(doc.updatedAt)}}z</div>
					</div>
				</div>
				<div id="misc" class="col s12">
					<div v-if="miscDocuments.length == 0" class="no_files">No documents in this category found.</div>
					<div class="document" v-else v-for="doc in miscDocuments" :key="doc.id">
						<div class="title">{{doc.name}}</div>
						<router-link :to="`/files/documents/${doc.slug}`" class="button btn"><i class="material-icons">search</i></router-link>
						<div class="desc">{{doc.description}}</div>
						<div class="info">Updated at {{formatDate(doc.updatedAt)}}z</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

export default {
	name: 'Documents',
	title: 'Documents',
	data() {
		return {
			documents: null
		};
	},
	components: {
		Spinner
	},
	async mounted() {
		await this.getDocuments();
		M.Tabs.init(document.querySelectorAll('.tabs'), {});
	},
	methods: {
		async getDocuments() {
			const {data} = await zabApi.get('/file/documents');
			this.documents = data.data;
		},
		formatDate(date) {
			return new Date(date).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		}
	},
	computed: {
		loaDocuments() {
			return this.documents.filter(doc => doc.category == "loa"); 
		},
		sopDocuments() {
			return this.documents.filter(doc => doc.category == "sop");
		},
		policyDocuments() {
			return this.documents.filter(doc => doc.category == "policy");
		},
		miscDocuments() {
			return this.documents.filter(doc => doc.category == "misc");
		}
	}
};
</script>

<style scoped lang="scss">
.document {
	padding: 1em 1em .5em 1em;
	transition: background-color .3s ease;

	.title {
		font-weight: 700;
		font-size: 1.3rem;
	}

	.desc {
		font-size: .9rem;
	}

	.button {
		float: right;
		margin-top: -30px;
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

.tabs {
	overflow-x: auto;

	&::-webkit-scrollbar {
		height: 3px;
	}

	&::-webkit-scrollbar-track {
		background-color: #fff;
	}

	&::-webkit-scrollbar-thumb:horizontal {
		background-color: $gray_light;
	}
}

.loading_files {
	padding-top: 5em;
}
</style>