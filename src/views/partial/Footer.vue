<template>
    <footer class="page-footer">
		<div class="wrapper footer_top">
			<div id="footer_text">
				<p>This site is not affiliated with the FAA, or any governing aviation body. All content contained herein is approved only for use on the VATSIM network.</p>
				<p>This site works best in Google Chrome, Mozilla Firefox, and Microsoft Edge.</p>
				<p>If you are still using Internet Explorer, please consider switching to a more modern browser.</p>
			</div>
			<img :src="require('@/assets/images/icons/zab_icon_new.png')" alt="">
		</div>
		<div class="footer-copyright">
			<div class="wrapper">
				<div class="copyright-text">Copyright &copy; <span id="full_year"></span> Albuquerque ARTCC</div>
				<!-- Made with ♥ and (╯°□°）╯︵ ┻━┻ by Austin Robison and Daan Janssen. -->
				<p>All times Zulu | Current date and time (Zulu): <span class="bold" ref="zulu_time">(...)</span></p>
				<p class="footer_notice">Open source on <a href="https://gitlab.com/albuquerque-web-stack/" class="white-text" target="_blank">GitLab</a></p>
			</div>
		</div>
    </footer>
</template>

<script>
export default {
	mounted () {
		setInterval(() => {
			this.$refs.zulu_time.innerHTML = this.dtFull(new Date());
		}, 1000);

		document.getElementById("full_year").innerHTML = new Date().getFullYear();
	}
};
</script>

<style scoped lang="scss">

p {
	margin: 0;

	.bold {
		font-weight: 700;
	}
}

body .page-footer {
	padding: 0;
	.footer-copyright {
		display: block;
	}
} 

.footer_top {
	display: flex;
	align-items: center;
	justify-content: space-between;

	img {
		height: 70px;
	}
}

#time {
	font-weight: 700;
}

.wrapper {
	padding: 1em;
}

#footer_text, .footer-copyright {
	padding: 0!important;
	min-height: 20px!important;
}

.footer_notice {
	a {
		font-weight: 600;
	}
}

</style>