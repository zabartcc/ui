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
				<p class="small-text right">Open source on <a href="https://gitlab.com/albuquerque-web-stack/ui" class="white-text" target="_blank">GitLab</a></p>
				<div class="text-lg font-bold copyright-text">Copyright &copy; <span id="full_year"></span> Albuquerque ARTCC</div>
				<!-- Made with pride by Austin Robison. -->
				<p>Current date and time (Zulu): <span id="time">...</span></p>
			</div>
		</div>
    </footer>
</template>

<script>
export default {
	mounted () {
		setInterval(function () {
			let d = new Date();
			document.querySelector('.footer-copyright #time').innerHTML = d.toLocaleString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'});
		}, 1000);

		document.getElementById('full_year').innerHTML = new Date().getFullYear();
	}
};
</script>

<style scoped lang="scss">

p {
	margin: 0;
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

.small-text {
	font-size: .7em;
	font-weight: 200;
	margin-top: 5px;
	a {
		font-weight: 600;
	}
}

</style>