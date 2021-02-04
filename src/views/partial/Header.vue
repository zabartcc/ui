<template>
	<header>
		<div id="header_hero" class="hero2">
			<div class="wrapper">
				<div>
					<router-link to="/"><h1>ALBUQUERQUE<span>ARTCC</span></h1></router-link>
				</div>
                <router-link to="/"><img :src="require('@/assets/images/icons/zab_icon_new.png')" alt=""></router-link>
			</div>
		</div>
		<nav>
			<div class="nav-wrapper wrapper">
				<ul class="left hide-on-med-and-down">
					<li>
						<router-link to="/">HOME</router-link>
					</li>
					<li class="has_dropdown" data-state="hide">
						<a class="dropdown-left" href="#!" data-target="controllers-dropdown">CONTROLLERS</a>
						<ul id="controllers-dropdown" class="dropdown-content">
							<li>
								<router-link to="/controllers">Controller Roster</router-link>
							</li>
							<li>
								<router-link to="/controllers/staff">ARTCC Staff</router-link>
							</li>
						</ul>
					</li>
					<li>
						<router-link to="/events">EVENTS</router-link>
					</li>
					<li>
						<router-link to="/news">NEWS</router-link>
					</li>
					<li class="has_dropdown" data-state="hide">
						<a class="dropdown-left" href="#!" data-target="files-dropdown">FILES</a>
						<ul id="files-dropdown" class="dropdown-content">
							<li>
								<router-link to="/files/downloads">Downloads</router-link>
							</li>
							<li>
								<router-link to="/files/documents">Documents</router-link>
							</li>
						</ul>
					</li>
					<li>
						<router-link to="/feedback">FEEDBACK</router-link>
					</li>
				</ul>
				<router-link to="#" data-target="mobile-menu" class="sidenav-trigger"><i class="material-icons">menu</i></router-link>
				<ul class="right left-on-med-and-down">
					<li>
						<a v-show="user.isLoggedIn" class="dropdown-right" href="#!" data-target="user-dropdown">Logged In As: {{user.isLoggedIn ? `${user.data.fname} ${user.data.lname}` : '...'}}</a>
                        <a v-if="!user.isLoggedIn" id="login_button" @click.prevent="processLogin" href="#">Login</a>
						<ul v-show="user.isLoggedIn" id="user-dropdown" class="dropdown-content">
							<li v-if="user.isLoggedIn && user.data.isMem">
								<router-link to="/dash">Controller Dashboard</router-link>
							</li>
							<li v-else>
								<router-link to="/controllers/visit">Become a Visitor</router-link>
							</li>
							<li v-if="user.isLoggedIn && (user.data.isIns || user.data.isStaff)" class="divider"></li>
							<li v-if="user.isLoggedIn && user.data.isStaff">
								<a href="https://sunport.zabartcc.org/mail/" target="_blank" rel="noopener noreferrer">Webmail</a>
							</li>
							<li v-if="user.isLoggedIn && user.data.isIns">
								<router-link to='/ins'>Instructor Dashboard</router-link>
							</li>
							<li v-if="user.isLoggedIn && user.data.isStaff">
								<router-link to='/admin'>Admin Dashboard</router-link>
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
				<router-link class="sidenav-close" to="/">HOME</router-link>
			</li>
			<li>
				<router-link class="sidenav-close" to="/controllers">CONTROLLER ROSTER</router-link>
			</li>
						<li>
				<router-link class="sidenav-close" to="/files/downloads">CONTROLLER DOWNLOADS</router-link>
			</li>
			<li>
				<router-link class="sidenav-close" to="/files/documents">CONTROLLER DOCUMENTS</router-link>
			</li>
			<li>
				<router-link class="sidenav-close" to="/controllers/staff">ARTCC STAFF</router-link>
			</li>
			<li>
				<router-link to="/controllers/visit">BECOME A VISITOR</router-link>
			</li>
			<li>
				<router-link class="sidenav-close" to="/events">EVENTS</router-link>
			</li>
			<li>
				<router-link class="sidenav-close" to="/news">NEWS</router-link>
			</li>
			<li>
				<router-link class="sidenav-close" to="/feedback">FEEDBACK</router-link>
			</li>
		</ul>

	</header>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
	methods: {
		...mapMutations('user', [
			'setUser',
			'setRedirect'
		]),
		...mapActions('user', [
			'logout'
		]),
		async processLogin() {
			localStorage.setItem('redirect', this.$route.path);
			window.location.href = `https://login.vatusa.net/uls/v2/login?fac=ZAB&url=${process.env.VUE_APP_ULS_LOGIN_REDIRECT_URL || 2}`;
		},
		async processLogout() {
			await this.logout();
			M.toast({
				html: '<i class="material-icons left">done</i> Successfully logged out. <div class="border"></div>',
				displayLength: 5000,
				classes: 'toast toast_info',
			});
			if(this.$route.meta.isAdmin) {
				this.$router.push('/');
			}
		}
	},
	computed: {
		...mapState('user', [
			'user'
		])
	},
	mounted() {
		// let hero = document.querySelector('#header_hero');
		// hero.className = '';
		// hero.classList.add('hero' + Math.floor((Math.random() * 5) + 1));

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
	},
};
</script>

<style scoped lang="scss">
#header_hero {
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	max-width: 3840px;
	margin: 0 auto;
	position: relative;

	&::before {
		background: rgba($primary-color, 0.6);
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		content: "";
		position: absolute;
	}

	&.hero1 {
		background-image: url('~@/assets/images/hero/grand_canyon.jpg');
		background-position: top 20% center;
	}

	&.hero2 {
		background-image: url('~@/assets/images/hero/scaled/camelback.jpg');
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
		padding: 2em 1em;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		a {
			display: block;

			img {
				height: 125px;
			}
		}

		h1 {
			font-weight: 600;
			// margin-left: 60px;
			margin: 0;
			font-size: 3rem;
			color: #fff;
			// padding: 0 15px;
			text-shadow: -2px -2px 3px $primary-color-light;
			// background: rgba(#fff,0.75);

			span {
				display: block;
				margin-left: 50%;
				font-size: 1.8rem;
				font-weight: 400;
			}
		}
	}
}

nav {
	background-color: $primary-color;
}

@media screen and (max-width: 910px) {
	#header_hero .wrapper {
		padding: 15px;

		a img {
			height: 80px;
			width: auto;
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