<template>
	<header>
		<div id="header_hero" class="hero1">
			<div class="wrapper">
				<a href="/">
                    <img :src="require('@/assets/images/icons/zab_icon_new.png')" alt="">
				</a>
				<div>
					<h1>ALBUQUERQUE<span>ARTCC</span></h1>
				</div>
			</div>
		</div>

		<nav>
			<div class="nav-wrapper wrapper">
				<ul class="left hide-on-med-and-down">
					<li>
						<a href="/">HOME</a>
					</li>
					<li class="has_dropdown" data-state="hide">
						<a class="dropdown-left" href="#!" data-target="controllers-dropdown">CONTROLLERS</a>
						<ul id="controllers-dropdown" class="dropdown-content">
							<li>
								<a href="/controllers">Controller Roster</a>
							</li>
							<li>
								<a href="/controllers/files">Controller Downloads</a>
							</li>
							<li>
								<a href="/controllers/staff">ARTCC Staff</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="/events">EVENTS</a>
					</li>
					<li>
						<a href="/news">NEWS</a>
					</li>
					<li>
						<a href="/feedback">FEEDBACK</a>
					</li>
					<li>
						<a href="https://community.zabartcc.org">FORUMS</a>
					</li>
				</ul>
				<a href="#" data-target="mobile-menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
				<ul class="right left-on-med-and-down">
					<li>
						<a v-if="user.data" class="dropdown-right" href="#!" data-target="user-dropdown">Logged In As: {{`${user.data.lname}, ${user.data.fname}`}}</a>
                        <a v-else id="login_button" @click.prevent="processLogin" href="#">Login</a>
						<ul v-if="user.data" id="user-dropdown" class="dropdown-content">
							<li>
								<a href="/dashboard">Controller Dashboard</a>
							</li>
							<li v-if="user.data.isStaff" class="divider"></li>
							<li v-if="user.data.isStaff">
								<a href="http://sunport.zabartcc.org/mail" target="_blank" rel="noopener noreferrer">Webmail</a>
							</li>
							<li v-if='user.data.isIns'>
								<a href='/ins'>Instructor Dashboard</a>
							</li>
							<li v-if='user.data.isMgt'>
								<a href='/admin'>Admin Dashboard</a>
							</li>
							<li class="divider"></li>
							<li>
								<a @click.prevent="processLogout" href="#">Logout</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>

		<ul class="sidenav" id="mobile-menu">
			<li>
				<a class="sidenav-close" href="/">HOME</a>
			</li>
			<li>
				<a class="sidenav-close" href="/controllers">CONTROLLER ROSTER</a>
			</li>
			<li>
				<a class="sidenav-close" href="/controllers/files">CONTROLLER DOWNLOADS</a>
			</li>
			<li>
				<a class="sidenav-close" href="/controllers/staff">ARTCC STAFF</a>
			</li>
			<li>
				<a class="sidenav-close" href="/events">EVENTS</a>
			</li>
			<li>
				<a class="sidenav-close" href="/news">NEWS</a>
			</li>
			<li>
				<a class="sidenav-close" href="/feedback">FEEDBACK</a>
			</li>
			<li>
				<a class="sidenav-close" href="https://community.zabartcc.org">FORUMS</a>
			</li>
		</ul>

	</header>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
	mounted() {
		let hero = document.querySelector('#header_hero');
		hero.className = '';
		hero.classList.add('hero' + Math.floor((Math.random() * 5) + 1));

		M.Dropdown.init(document.querySelectorAll('.dropdown-left'), {
			coverTrigger: false,
			constrainWidth: false
		});
		M.Dropdown.init(document.querySelectorAll('.dropdown-right'), {
			alignment: 'right',
			coverTrigger: false,
			constrainWidth: false
		});
		M.Sidenav.init(document.querySelectorAll('.sidenav'), {
			edge: 'right'
		});

		console.log(this.user);
	},
	methods: {
		...mapMutations('user', [
			'setUser'
		]),
		processLogin: () => {
			window.location.href = 'https://login.vatusa.net/uls/v2/login?fac=ZAB&url=2';
		},
		processLogout: function () {
			localStorage.removeItem('token');
			this.setUser(null);
		}
	},
	computed: {
		...mapState('user', [
			'user'
		])
	}
};
</script>

<style scoped lang="scss">
#header_hero {
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	max-width: 3840px;
	margin: 0 auto;

	&.hero1 {
		background-image: url('~@/assets/images/hero/grand_canyon.jpg');
	}

	&.hero2 {
		background-image: url('~@/assets/images/hero/camelback.jpg');
	}

	&.hero3 {
		background-image: url('~@/assets/images/hero/saguaro.jpg');
	}

	&.hero4 {
		background-image: url('~@/assets/images/hero/abq.jpg');
	}

	&.hero5 {
		background-image: url('~@/assets/images/hero/cactus.jpg');
	}

	.wrapper {
		padding: 20px;
		display: flex;
		align-items: center;

		a {
			display: block;

			img {
				height: 175px;
			}
		}

		h1 {
			font-weight: 600;
			margin-left: 60px;
			color: $primary-color;
			padding: 0 15px;
			text-shadow: 2px 2px 1px #fff;
			background: rgba(#fff,0.75);

			span {
				display: block;
				margin-left: 45%;
				font-size: 3.6rem;
				font-weight: 400;
			}
		}
	}
}

@media screen and (max-width: 910px) {
	#header_hero .wrapper {
		padding: 15px;
		flex-direction: column;

		a img {
			height: 100px;
		}

		h1 {
			font-size: 32px;
			margin: 20px 0 0 0;

			span {
				font-size: 24px;
			}
		}
	}
}
</style>