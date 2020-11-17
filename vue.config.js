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
			'^/metar': {
				target: 'https://metar.vatsim.net',
				changeOrigin: true,
				pathRewrite: { "^/metar": "/" }
			},
			'^/api': {
				target: 'https://devapi.zabartcc.org',
				changeOrigin: true,
				pathRewrite: { "^/devapi": "/" }
			}
		}
	}
};