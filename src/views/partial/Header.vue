<template>
  <header>
    <div id="header_hero" :class="`hero${number === 69 ? '_aprilfools' : '6'}`">
      <div class="wrapper">
        <div>
          <router-link to="/"
            ><h1>ALBUQUERQUE<span>ARTCC</span></h1></router-link
          >
        </div>
        <router-link to="/"
          ><img
            src="https://zabartcc.sfo3.digitaloceanspaces.com/images/zab_logo.png"
            alt=""
            draggable="false"
            height="125"
            width="125"
        /></router-link>
      </div>
    </div>
    <nav>
      <div class="nav-wrapper wrapper">
        <ul class="left hide-on-med-and-down">
          <li>
            <router-link to="/">HOME</router-link>
          </li>
          <li class="has_dropdown" data-state="hide">
            <a
              class="dropdown-left"
              href="#!"
              data-target="controllers-dropdown"
              >CONTROLLERS</a
            >
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
            <a class="dropdown-left" href="#!" data-target="files-dropdown"
              >FILES</a
            >
            <ul id="files-dropdown" class="dropdown-content">
              <li>
                <router-link to="/files/documents">Documents</router-link>
              </li>
              <li>
                <router-link to="/files/downloads">Downloads</router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/feedback">FEEDBACK</router-link>
          </li>
        </ul>
        <router-link to="#" data-target="mobile-menu" class="sidenav-trigger"
          ><i class="material-icons">menu</i></router-link
        >
        <ul class="right left-on-med-and-down">
          <li>
            <a
              v-show="user.isLoggedIn"
              class="dropdown-notif nav_notifications"
              href="#!"
              data-target="notifications-dropdown"
              ><i class="material-icons">notifications</i>
              <div v-if="unread" class="new_notification"></div
            ></a>
            <ul
              v-show="user.isLoggedIn"
              id="notifications-dropdown"
              class="dropdown-content"
            >
              <Notifications v-if="user.isLoggedIn" />
            </ul>
          </li>
          <li class="user">
            <a
              v-show="user.isLoggedIn"
              class="dropdown-right user_name"
              href="#!"
              data-target="user-dropdown"
              >{{
                user.isLoggedIn
                  ? `${user.data.fname} ${user.data.lname}`
                  : "..."
              }}<i class="material-icons user_dropdown_arrow"
                >arrow_drop_down</i
              ></a
            >
            <a
              v-if="!user.isLoggedIn"
              id="login_button"
              @click.prevent="processLogin"
              href="#"
              >Login</a
            >
            <ul
              v-show="user.isLoggedIn"
              id="user-dropdown"
              class="dropdown-content"
            >
              <li v-if="user.isLoggedIn && user.data.isMem">
                <router-link to="/dash">Controller Dashboard</router-link>
              </li>
              <li v-else>
                <router-link to="/controllers/visit"
                  >Become a Visitor</router-link
                >
              </li>
              <li
                v-if="user.isLoggedIn && (user.data.isIns || user.data.isStaff)"
                class="divider"
              ></li>
              <li
                v-if="user.isLoggedIn && (user.data.isIns || user.data.isStaff)"
              >
                <a
                  href="https://sunport.zabartcc.org/mail/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Webmail</a
                >
              </li>
              <li v-if="user.isLoggedIn && user.data.isIns">
                <router-link to="/ins">Instructor Dashboard</router-link>
              </li>
              <li v-if="user.isLoggedIn && user.data.isStaff">
                <router-link to="/admin">Admin Dashboard</router-link>
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
        <router-link class="sidenav-close" to="/controllers"
          >ROSTER</router-link
        >
      </li>
      <li>
        <router-link class="sidenav-close" to="/files/documents"
          >DOCUMENTS</router-link
        >
      </li>
      <li>
        <router-link class="sidenav-close" to="/files/downloads"
          >DOWNLOADS</router-link
        >
      </li>
      <li>
        <router-link class="sidenav-close" to="/controllers/staff"
          >STAFF</router-link
        >
      </li>
      <li>
        <router-link class="sidenav-close" to="/events">EVENTS</router-link>
      </li>
      <li>
        <router-link class="sidenav-close" to="/news">NEWS</router-link>
      </li>
      <!-- <li>
				<router-link class="sidenav-close" to="/briefing">PILOT BRIEFING</router-link>
			</li> -->
      <li>
        <router-link class="sidenav-close" to="/feedback">FEEDBACK</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Notifications from "./Notifications.vue";
import { vatsimAuthRedirectUrl } from "@/helpers/uriHelper.js";

export default {
  data() {
    return {
      number: 0,
      unread: false,
    };
  },
  components: {
    Notifications,
  },
  methods: {
    ...mapMutations("user", ["setUser", "setRedirect"]),
    ...mapActions("user", ["logout"]),
    async processLogin() {
      localStorage.setItem("redirect", this.$route.path);
      window.location.href = vatsimAuthRedirectUrl;
    },
    async processLogout() {
      await this.logout();
      this.toastInfo("Successfully logged out");
      if (
        this.$route.meta.isAdmin ||
        this.$route.meta.isAdmin ||
        this.$route.meta.loggedIn
      )
        this.$router.push("/");
    },
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  async mounted() {
    this.number = Math.floor(Math.random() * 200);
    M.Dropdown.init(document.querySelectorAll(".dropdown-right"), {
      alignment: "right",
      coverTrigger: false,
      constrainWidth: false,
    });
    M.Dropdown.init(document.querySelectorAll(".dropdown-notif"), {
      alignment: "right",
      coverTrigger: false,
      constrainWidth: false,
      closeOnClick: false,
    });
    M.Dropdown.init(document.querySelectorAll(".dropdown-left"), {
      alignment: "left",
      coverTrigger: false,
      constrainWidth: false,
    });
    M.Sidenav.init(document.querySelectorAll(".sidenav"), {
      edge: "right",
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
    background-image: url("@/assets/images/hero/grand_canyon.jpg");
    background-position: top 20% center;
  }

  &.hero2 {
    background-image: url("@/assets/images/hero/scaled/camelback.jpg");
  }

  &.hero3 {
    background-image: url("@/assets/images/hero/saguaro.jpg");
  }

  &.hero4 {
    background-image: url("@/assets/images/hero/abq.jpg");
  }

  &.hero5 {
    background-image: url("@/assets/images/hero/cactus.jpg");
  }

  &.hero6 {
    background-image: url("@/assets/images/hero/sandias.jpg");
  }

  &.hero_aprilfools {
    background-image: url("@/assets/images/hero/bb.jpg");
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
      margin: 0;
      font-size: 3rem;
      color: #fff;
      text-shadow: -2px -2px 3px $primary-color-light;

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

.user_dropdown_arrow {
  display: inline-block;
  display: inline-flex;
  vertical-align: top;
  font-size: 22px;
  margin-top: 1px;
  margin-left: -1px;
}

.nav_notifications {
  padding: 1px 0 0 0;
  transition: 0.3s ease;
  position: relative;

  &:hover {
    background: transparent;
    color: rgb(220, 220, 220);
  }

  i {
    font-size: 20px;
  }

  .new_notification {
    height: 7px;
    width: 7px;
    background-color: $secondary-color-dark;
    border-radius: 50%;
    position: absolute;
    top: 25px;
    left: 11px;
  }
}

#notifications-dropdown {
  color: $primary-color;
  line-height: 1.1em;
  padding: 1em 1em 0.5em 1em;
  overflow: hidden;
}

.user_name {
  transition: 0.3s ease;

  &:hover {
    background: transparent;
    color: rgb(220, 220, 220);
  }
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
