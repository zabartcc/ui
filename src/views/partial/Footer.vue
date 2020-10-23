<template>
    <footer class="page-footer">
		<div class="wrapper footer_top">
			<div id="footer_text">
				<p>This site is not affiliated with the FAA, or any governing aviation body. All content contained herein is approved only for use on the VATSIM network.</p>
				<p>This site works best in Google Chrome, Mozilla Firefox and Microsoft Edge.</p>
				<p>If you are still using Internet Explorer, please consider switching to a more modern browser.</p>
			</div>
			<img :src="require('@/assets/images/icons/zab_icon_new.png')" alt="">
		</div>
		<div class="footer-copyright">
			<div class="wrapper">
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
		let days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];

		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		function ordinalDay (day) {
			let ordinal = '';
			if (day > 3 && day < 21) return day + 'th';
			switch (day % 10) {
			case 1: ordinal = 'st'; break;
			case 2: ordinal = 'nd'; break;
			case 3: ordinal = 'rd'; break;
			}

			return day + ordinal;
		}

		function addZero (num) {
			if (num < 10) return '0' + num;
			else return num;
		}

		setInterval(function () {
			let d = new Date();
			document.querySelector('.footer-copyright #time').innerHTML = days[d.getUTCDay()] + ', ' + months[d.getUTCMonth()] + ' ' + ordinalDay(d.getUTCDate()) + ', ' + d.getUTCFullYear() + ' ' + addZero(d.getUTCHours()) + ':' + addZero(d.getUTCMinutes()) + ':' + addZero(d.getUTCSeconds());
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
	padding: 1em 0;
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


</style>