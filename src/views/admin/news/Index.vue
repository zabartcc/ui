<template>
	<div class="card">
		<div class="card-content">
			<router-link class="btn right" to="/admin/news/new"><i class="material-icons">add</i></router-link>
			<span class="card-title">News Items</span>
		</div>
		<div class="table_wrapper" v-if=loaded>
			<table class="striped compact" v-if="newsItems.length">
				<thead>
					<tr>
						<th>Title</th>
						<th>Posted</th>
						<th>Author</th>
						<th class="options">Options</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='news in newsItems' :key=news._id>
						<td>
							{{news.title}}
						</td>
						<td>
							{{newsPostDate(news)}}
						</td>
						<td>
							{{news.createdBy.fname}} {{news.createdBy.lname}}
						</td>
						<td class="options">
							<router-link data-position="top" data-tooltip="Edit News" class="tooltipped" :to="`/admin/news/${news.uriSlug}`">
								<i class="material-icons">edit</i>
							</router-link>
							<a :href="`#modal_delete_${news._id}`" data-position="top" data-tooltip="Delete News" class="tooltipped modal-trigger">
								<i class="material-icons red-text text-darken-2">delete</i>
							</a>
						</td>
						<div :id="`modal_delete_${news._id}`" class="modal modal_delete">
							<div class="modal-content">
								<h4>Are you sure?</h4>
								<p>This action is not reversable.</p>
							</div>
							<div class="modal-footer">
								<a href="#!" class="waves-effect btn" @click="deleteNews(news.uriSlug)">I'm sure</a>
								<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
							</div>
						</div>
					</tr>
				</tbody>
			</table>
			<div class="card-content" v-else>
				<p class="italic">There are no news items.</p>
			</div>
		</div>
		<div v-else class="card-content">
			<Spinner />
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import Spinner from '@/components/Spinner.vue';

export default {
	components: {
		Spinner
	},
	data() {
		return {
			newsItems: [],
			loaded: false
		};
	},
	async mounted() {
		await this.getNewsItems();
	},
	methods: {
		async getNewsItems() {
			const { data: resp } = await zabApi.get('/news');
			if(resp.ret_det.code === 200) {
				this.newsItems = resp.data;
				this.loaded = true;
			}
			this.$nextTick(() => {
				M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
					margin: 0
				});
				M.Modal.init(document.querySelectorAll('.modal'), {
					preventScrolling: false
				});
			});
		},
		newsPostDate(n) {
			const date = new Date(n.createdAt);
			return date.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'});
		},
		async deleteNews(slug) {
			const { data: resp } = await zabApi.delete(`/news/${slug}`);

			console.log(resp);

			if(resp.ret_det.code !== 200) {
				M.toast({
					html: `<i class="material-icons left">error_outline</i> ${resp.ret_det.message} <div class="border"></div>`,
					displayLength: 5000,
					classes: 'toast toast_error'
				});
			} else {
				M.toast({
					html: '<i class="material-icons left">done</i> News succesfully deleted! <div class="border"></div>',
					displayLength: 5000,
					classes: 'toast toast_success',
				});
				this.$nextTick(async () => {
					M.Modal.getInstance(document.querySelector('.modal_delete')).close();
					await this.getNewsItems();
				});
			}
		}
	}

};
</script>

<style lang="scss" scoped>
	.options {
		text-align: right;
	}

	.italic {
		font-style: italic;
	}
</style>