module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/assets/css/styles.scss";`
			}
		}
	},
	devServer: {
		proxy: {
			'^/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				pathRewrite: { "^/api": "/" }
			},
			'/vatusa': {
				target: 'https://api.vatusa.net/v2',
				changeOrigin: true,
				pathRewrite: { "^/vatusa": "/" }
			}
		}
	}
};