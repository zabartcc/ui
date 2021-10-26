export default {
	toastError(msg) {
		M.toast({
			html: `<i class="material-icons left">error_outline</i>${msg || 'Something went wrong, please try again'}<div class="border"></div>`,
			displayLength: 5000,
			classes: 'toast toast_error'
		});
	},
	toastSuccess(msg) {
		M.toast({
			html: `<i class="material-icons left">done</i>${msg}<div class="border"></div>`,
			displayLength: 5000,
			classes: 'toast toast_success'
		});
	},
	toastInfo(msg) {
		M.toast({
			html: `<i class="material-icons left">info_outline</i>${msg}<div class="border"></div>`,
			displayLength: 5000,
			classes: 'toast toast_info'
		});
	},
};