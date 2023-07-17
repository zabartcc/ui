<template>
    <footer class="page-footer">
		<div class="wrapper footer_top">
			<div id="footer_text">
				<p>This site is not affiliated with the FAA, or any governing aviation body. All content contained herein is approved only for use on the VATSIM network.</p>
				<p>This site works best in Google Chrome, Mozilla Firefox, and Microsoft Edge.</p>
				<p>If you are still using Internet Explorer, please consider switching to a more modern browser.</p>
			</div>
			<img src="https://zabartcc.sfo3.digitaloceanspaces.com/images/zab_logo.png" alt="" draggable="false" height="70" width="70">
		</div>
		<div class="footer_pride">
			<div class="wrapper">
				<div class="footer_flags">
					<div class="pride_flag"></div>
					<div class="trans_flag"></div>
					<div class="bi_flag"></div>
					<div class="pan_flag"></div>
				</div>
				<a href="#lgbt_modal" class="modal-trigger">
					The Albuquerque ARTCC stands with the LGBTQIA+ community on VATSIM
				</a>
			</div>
		</div>
		<div class="footer-copyright">
			<div class="wrapper">
				<div class="text-lg font-bold copyright-text">Copyright &copy; <span id="full_year"></span> Albuquerque ARTCC</div>
				<div class="hide-on-small-only">•</div>
				<!-- Made with ♥ and (╯°□°）╯︵ ┻━┻ by Alexandra Robison and Daan Janssen. -->
				<div><router-link to="/privacy-policy" class="white-text">Privacy Policy</router-link></div>
				<div class="hide-on-small-only">•</div>
				<div><span ref="zulu_time">{{ footerTime }}</span></div>
				<div class="hide-on-small-only">•</div>
				<p class="footer_notice">Open source on <a href="https://github.com/zabartcc" class="white-text" target="_blank" rel="noopener noreferrer">GitHub</a></p>
			</div>
		</div>
		<div id="lgbt_modal" class="modal">
			<div class="modal-content">
				<h5>We stand with the LGBTQIA+ community on VATSIM</h5>
				<p>Albuquerque ARTCC displays the rainbow, transgender, bisexual, and pansexual flags as a show of solidarity with the LGBTQIA+ community on VATSIM. You are welcome here, and you have our support.</p>
				<p>As an organization with LGBTQIA+ members, we recognize the importance of creating a welcoming environment to all members. Everyone is welcome here, regardless of their race, nationality, national origin, ethnicity, ethnic origin, socioeconomic status, religion, age, disability, sexual orientation, gender, or gender identity.</p>
				<p>We recognize CZQO, CZWG, ZMA, ZNY, ZOA, ZOB and ZSE for displaying similar statements on their websites.</p>
				<div class="modal_flags">
					<div class="pride_flag"></div>
					<div class="trans_flag"></div>
					<div class="bi_flag"></div>
					<div class="pan_flag"></div>
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

		this.$nextTick(() => {
			document.getElementById("full_year").innerHTML = new Date().getFullYear();
		});

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
		font-size: .8rem;

		.wrapper {
			display: flex;

			div {
				margin-right: .8em;
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
}

#footer_text, .footer-copyright {
	padding: 0!important;
	min-height: 20px!important;
}

#footer_text {
	margin-right: 1em;
	line-height: 16px;

	p + p {
		margin-top: 0.4em;
	}
}

.footer_notice {
	a {
		font-weight: 600;
	}
}

.footer_pride {
	.footer_flags {
		display: flex;

		div {
			height: 1rem;
			width: 1.5rem;

			&+div {
				margin-left: .25em;
			}
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
	color: #000;

	p {
		margin-bottom: 1em;
	}
}

.modal_flags {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2em;

	div {
		height: 2rem;
		width: 3rem;

		&+div {
			margin-left: .5em;
		}
	}
}

.pride_flag {
	background: linear-gradient(180deg, #FE0000 16.66%,
	#FD8C00 16.66%, 33.32%,
	#FFE500 33.32%, 49.98%,
	#119F0B 49.98%, 66.64%,
	#0644B3 66.64%, 83.3%,
	#C22EDC 83.3%);
}

.bi_flag {
	background: linear-gradient(180deg, #D60270 40%, #9B4F96 40%, 60%, #0038A8 60%);
}

.pan_flag {
	background: linear-gradient(180deg, #FF218C 33%, #FFD800 33%, 66%, #21B1FF 66%);
}

.trans_flag {
	background: linear-gradient(180deg, #5BCEFA 20%, #F5A9B8 20%, 40%, #FFFFFF 40%, 60%, #F5A9B8 60%, 80%, #5BCEFA 80%);
}


@media screen and (max-width: 575px) {
	body .page-footer .footer-copyright .wrapper {
		flex-direction: column;
		align-items: center;
	}
}

</style>
