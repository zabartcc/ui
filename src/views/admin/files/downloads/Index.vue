<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="card-title col s8"><span class="card-title">Downloads</span></div>
				<div class="col s4"><router-link to="/admin/files/downloads/new"><span class="btn waves-effect waves-light new_event_button right">New</span></router-link></div>
			</div>
		</div>
		<div class="loading_container" v-if="downloads === null">
			<Spinner />
		</div>
		<div class="no_downloads" v-else-if="downloads && downloads.length == 0">There are no downloads</div>
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
					<tr v-for="(file, i) in downloads" :key="file.id">
						<td class="name">{{file.name}}</td>
						<td>{{convertCategory(file.category)}}</td>
						<td>{{dtLong(file.updatedAt)}}</td>
						<td class="options">
							<router-link data-position="top" data-tooltip="Edit Download" class="tooltipped" :to="`/admin/files/downloads/${file._id}`"><i class="material-icons">edit</i></router-link>
							<a :href="`#modal_delete_${i}`" data-position="top" data-tooltip="Delete Download" class="tooltipped modal-trigger"><i class="material-icons red-text text-darken-2">delete</i></a>
						</td>
						<div :id="`modal_delete_${i}`" class="modal modal_delete">
						<div class="modal-content">
							<h4>Delete download?</h4>
							<p>This will delete <b>{{file.name}}</b> from the downloads section completely</p>
						</div>
						<div class="modal-footer">
							<a href="#!" class="waves-effect waves-light btn" @click="deleteDownload(file._id)">Delete</a>
							<a href="#!" class="modal-close waves-effect waves-light btn-flat">Cancel</a>
						</div>
					</div>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import {zabApi} from '@/helpers/axios.js';

export default {
	name: 'Downloads',
	title: 'Downloads',
	data() {
		return {
			downloads: null
		};
	},
	async mounted() {
		await this.getDownloads();
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
	},
	methods: {
		async getDownloads() {
			const {data} = await  zabApi.get('/file/downloads');
			this.downloads = data.data;
		},
		async deleteDownload(id) {
			try {
				const {data} = await zabApi.delete(`/file/downloads/${id}`);
				if(data.ret_det.code === 200) {
					this.toastSuccess('Download deleted');

					await this.getDownloads();
					setTimeout(() => M.Modal.getInstance(document.querySelector('.modal_delete')).close(), 500);
				} else {
					this.toastError(data.ret_det.message);
				}
			} catch(e) {
				console.log(e);
			}
		},
		convertCategory(cat) {
			if(cat == "veram") return "vERAM";
			else if(cat == "vstars") return "vSTARS";
			else if(cat == "vatis") return "vATIS";
			else return "Miscellaneous";
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

.no_downloads {
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

.modal_delete {
	min-width: 400px;
	width: 30%;
}
</style>
