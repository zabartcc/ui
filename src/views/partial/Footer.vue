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
		<div class="footer_pride">
			<div class="wrapper">
				<div class="footer_flags">
					<img :src="require('@/assets/images/icons/lgbt_pride.png')" alt="">
					<img :src="require('@/assets/images/icons/trans_pride.png')" alt="">
					<img :src="require('@/assets/images/icons/bi_pride.png')" alt="">
				</div>
				<a href="#lgbt_modal" class="modal-trigger">
					The Albuquerque ARTCC stands with the LGBTQIA+ community on VATSIM.
				</a>
			</div>
		</div>
		<div class="footer-copyright">
			<div class="wrapper">
				<div class="text-lg font-bold copyright-text">Copyright &copy; <span id="full_year"></span> Albuquerque ARTCC</div>
				<div>•</div>
				<!-- Made with pride by Austin Robison. -->
				<!-- ...and Daan Janssen -->
				<div><span id="time">(...)</span></div>
				<div>•</div>
				<p class="footer_notice">Open source on <a href="https://gitlab.com/albuquerque-web-stack/ui" class="white-text" target="_blank">GitLab</a></p>
			</div>
		</div>
		<div id="lgbt_modal" class="modal">
			<div class="modal-content">
				<h5>We stand with the LGBTQIA+ community on VATSIM</h5>
				<p>Albuquerque ARTCC displays the rainbow, transgender and bisexual flags as a show of solidarity with the LGBTQIA+ community on VATSIM. You are welcome here, and you have our support.</p>
				<p>As an organization with LGBTQIA+ members, we recognize the importance of creating a welcoming environment to all members. Everyone is welcome here, regardless of their race, nationality, national origin, ethnicity, ethnic origin, socioeconomic status, religion, age, disability, sexual orientation, gender or gender identity.</p>
				<p>We recognize CZQO, ZOB and ZJX for displaying similar statements on their websites.</p>
				<div class="modal_flags">
					<img :src="require('@/assets/images/icons/lgbt_pride.png')" alt="">
					<img :src="require('@/assets/images/icons/trans_pride.png')" alt="">
					<img :src="require('@/assets/images/icons/bi_pride.png')" alt="">
				</div>
			</div>
			<div class="modal-footer">
				<a href="#!" class="btn-flat waves-effect modal-close">Close</a>
			</div>
		</div>
    </footer>
</template>

<script>
export default {
	mounted () {
		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		setInterval(function () {
			document.getElementById("time").innerHTML = `${new Date().toLocaleString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'})}z`;
		}, 1000);

		document.getElementById("full_year").innerHTML = new Date().getFullYear();
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
		font-size: .8rem;

		.wrapper {
			display: flex;

			div {
				margin-right: 1em;
			}
		}
	}
} 

.wrapper {
	padding: 1em;
}

.footer_top {
	display: flex;
	align-items: center;
	justify-content: space-between;

	img {
		height: 70px;
	}
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

.footer_pride {
	img {
		height: 1em;

		&+img {
			margin-left: .25em;
		}
	}

	a {
		font-size: 0.8rem;
		margin-top: 0.5em;
		color: #fff;

		&:hover {
			text-decoration: underline;
		}
	}
}

#lgbt_modal {
	max-width: 750px;
	color: #000;

	p {
		margin-bottom: 1em;
	}
}

.modal_flags {
	img {
		height: 2em;

		&+img {
			margin-left: .5em;
		}
	}
}

</style>