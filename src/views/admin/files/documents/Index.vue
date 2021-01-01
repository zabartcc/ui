<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Documents</span></div>
				<div class="card-title col s4"><router-link to="/admin/files/documents/new"><span class="btn new_event_button right">New</span></router-link></div>
			</div>
		</div>
		<div class="loading_container" v-if="!documents">
			<Spinner />
		</div>
		<div class="no_downloads" v-else-if="documents && documents.length === 0">There are no documents to display.</div>
		<div class="table_wrapper" v-else>
			<table class="controller_list striped">
				<thead class="controller_list_head">
					<tr>
						<th>Name</th>
						<th>Category</th>
						<th>Last updated</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody class="controller_list_row">
					<tr v-for="(doc, i) in documents" :key="doc.id">
						<td class="name">{{doc.name}}</td>
						<td>{{convertCategory(doc.category)}}</td>
						<td>{{formatDate(doc.updatedAt)}}z</td>
						<td class="options">
							<router-link data-position="top" data-tooltip="Edit Document" class="tooltipped" :to="`/admin/files/documents/${doc._id}`"><i class="material-icons">edit</i></router-link>
							<a :href="`#modal_delete_${i}`" data-position="top" data-tooltip="Delete Document" class="tooltipped modal-trigger"><i class="material-icons red-text text-darken-2">delete</i></a>
						</td>
						<div :id="`modal_delete_${i}`" class="modal modal_delete">
						<div class="modal-content">
							<h4>Are you sure?</h4>
							<p>Are you sure you want to delete <b>{{doc.name}}</b> from the downloads section? This action is irreversible.</p>
						</div>
						<div class="modal-footer">
							<a href="#!" class="waves-effect btn" @click="deleteDownload(doc._id)">I'm sure</a>
							<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
						</div>
					</div>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import {FileMixin} from '@/mixins/FileMixin.js';
import Spinner from '@/components/Spinner.vue';

export default {
	data() {
		return {
			documents: null
		};
	},
	mixins: [FileMixin],
	components: {
		Spinner
	},
	async mounted() {
		await this.getDocuments();
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	methods: {
		async getDocuments() {
			this.documents = await this.getDocumentsMixin();
		},
		async deleteDownload(id) {
			const success = await this.deleteDownloadMixin(id).catch(() => {
				M.toast({
					html: '<i class="material-icons left">error_outline</i> Unable to delete download <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_error'
				});
				return false;
			});
			if(success) {
				M.toast({
					html: '<i class="material-icons left">done</i> Download deleted successfully <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				await this.getDownloads();
				setTimeout(() => M.Modal.getInstance(document.querySelector('.modal_delete')).close(), 500);
			}
		},
		convertCategory(cat) {
			if(cat == "loa") return "Agreements";
			else if(cat == "sop") return "Standard Operating Procedures";
			else if(cat == "policy") return "Policies";
			else return "Miscellaneous";
		},
		formatDate(date) {
			return new Date(date).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
		}
	},
};
</script>

<style scoped lang="scss">

.controller_list {
	padding: 10px;
}

.table_wrapper {
	width: 100%;
	overflow: auto;
}

.row_no_margin {
	margin-bottom: 0;
}

.controller_list_head {
	position: relative;
	font-weight: 700;
	border-bottom: 1px solid #666;
}

.controller_list_row {
	tr {
		transition: background-color .3s ease;
		&:hover {
			background: #eaeaea;
		}
	}

	div {
		padding: 0.5rem 1rem;
	}

	.name {
		font-weight: 700;
	}
}

.options {
	text-align: right;
}

.no_downloads {
	padding: 0 0 1em 1em;
	font-style: italic;
}

.modal_delete {
	min-width: 400px;
	width: 30%;
}
</style>