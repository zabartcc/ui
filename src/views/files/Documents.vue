<template>
	<div class="card card_documents">
		<div class="card-content">
			<span class="card-title">Documents</span>
		</div>
		<div class="row">
			<div class="col s12">
				<ul class="tabs">
					<li class="tab col s6 l2"><a class="active" href="#sop">SOPs</a></li>
					<li class="tab col s6 l3"><a href="#loa">LOAs</a></li>
					<li class="tab col s7 l3"><a href="#policy">Policies</a></li>
					<li class="tab col s6 l4"><a href="#misc">Miscellaneous</a></li>
				</ul>
			</div>
			<div class="loading_container loading_files" v-if="!documents">
				<Spinner />
			</div>
			<div class="tabs_content" v-else>
				<DocumentCategory v-for="(docs, cat) in documents" :key="cat" :cat="cat" :docs="docs" />
			</div>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';
import DocumentCategory from './DocumentCategory.vue';

export default {
	name: 'Documents',
	title: 'Documents',
	data() {
		return {
			documents: null
		};
	},
	components: {
		DocumentCategory
	},
	async mounted() {
		await this.getDocuments();
		M.Tabs.init(document.querySelectorAll('.tabs'), {});
	},
	methods: {
		async getDocuments() {
			const {data: fileData} = await zabApi.get('/file/documents');
			this.documents = {
				loa: fileData.data.filter(doc => doc.category === 'loa'),
				sop: fileData.data.filter(doc => doc.category === 'sop'),
				policy: fileData.data.filter(doc => doc.category === 'policy'),
				misc: fileData.data.filter(doc => doc.category === 'misc'),
			};
		},
	},
};
</script>

<style scoped lang="scss">
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