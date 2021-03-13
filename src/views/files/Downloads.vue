<template>
	<div class="card card_downloads">
		<div class="card-content">
			<span class="card-title">Downloads</span>
		</div>
		<div class="row">
			<div class="col s12">
				<ul class="tabs">
					<li class="tab col s6 l3"><a class="active" href="#sector">Sector Files</a></li>
					<li class="tab col s6 l2"><a href="#training">Training</a></li>
					<li class="tab col s7 l4"><a href="#mfr">Minor Field References</a></li>
					<li class="tab col s6 l3"><a href="#misc">Miscellaneous</a></li>
				</ul>
			</div>
			<div class="loading_container loading_files" v-if="downloads === null">
				<Spinner />
			</div>
			<div class="tabs_content" v-else>
				<div id="sector" class="col s12">
					<div v-if="sectorFiles.length == 0" class="no_files">No files in this category found.</div>
					<div class="download" v-else v-for="file in sectorFiles" :key="file.id">
						<div class="title">{{file.name}}</div>
						<a :href="`https://cdn.zabartcc.org/downloads/${file.fileName}`" class="btn button"><i class="material-icons">file_download</i></a>
						<div class="desc">{{file.description}}</div>
						<div class="info">Updated at {{formatDate(file.updatedAt)}}z</div>
					</div>
				</div>
				<div id="training" class="col s12">
					<div v-if="trainingFiles.length == 0" class="no_files">No files in this category found.</div>
					<div class="download" v-else v-for="file in trainingFiles" :key="file.id">
						<div class="title">{{file.name}}</div>
						<a :href="`https://cdn.zabartcc.org/downloads/${file.fileName}`" class="btn button"><i class="material-icons">file_download</i></a>
						<div class="desc">{{file.description}}</div>
						<div class="info">Updated at {{formatDate(file.updatedAt)}}z</div>
					</div>
				</div>
				<div id="mfr" class="col s12">
					<div v-if="mfrFiles.length == 0" class="no_files">No files in this category found.</div>
					<div class="download" v-else v-for="file in mfrFiles" :key="file.id">
						<div class="title">{{file.name}}</div>
						<a :href="`https://cdn.zabartcc.org/downloads/${file.fileName}`" class="btn button"><i class="material-icons">file_download</i></a>
						<div class="desc">{{file.description}}</div>
						<div class="info">Updated at {{formatDate(file.updatedAt)}}z</div>
					</div>
				</div>
				<div id="misc" class="col s12">
					<div v-if="miscFiles.length == 0" class="no_files">No files in this category found.</div>
					<div class="download" v-else v-for="file in miscFiles" :key="file.id">
						<div class="title">{{file.name}}</div>
						<a :href="`https://cdn.zabartcc.org/downloads/${file.fileName}`" class="btn button"><i class="material-icons">file_download</i></a>
						<div class="desc">{{file.description}}</div>
						<div class="info">Updated at {{formatDate(file.updatedAt)}}z</div>
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
	data() {
		return {
			downloads: null
		};
	},
	components: {
		Spinner
	},
	async mounted() {
		await this.getDownloads();
		M.Tabs.init(document.querySelectorAll('.tabs'), {});
	},
	methods: {
		async getDownloads() {
			const {data} = await zabApi.get('/file/downloads');
			this.downloads = data.data;
		},
		formatDate(date) {
			return new Date(date).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		}
	},
	computed: {
		sectorFiles() {
			return this.downloads.filter(file => file.category == "sectorFiles"); 
		},
		trainingFiles() {
			return this.downloads.filter(file => file.category == "training");
		},
		mfrFiles() {
			return this.downloads.filter(file => file.category == "mfr");
		},
		miscFiles() {
			return this.downloads.filter(file => file.category == "misc");
		}
	}
};
</script>

<style scoped lang="scss">
.download {
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