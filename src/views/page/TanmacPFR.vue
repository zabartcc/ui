<template>
  <div class="card">
    <div class="card-content">
      <span class="card-title">TANMAC PFR</span>
      <div class="card_desc">
        <p>
          Thank you for submitting a TANMAC PFR. The information you provided
          will be sent to the instructional staff and may be used in training.
        </p>
      </div>
      <div v-if="!user.isLoggedIn">
        <p>
          To prevent abuse of the system, all users need to log in via VATSIM
          before sending a PFR.
        </p>
        <br />
        <div class="center-align">
          <button class="btn btn-waves login_button" @click="login">
            Login via VATSIM
          </button>
        </div>
      </div>
      <form
        class="row row_no_margin"
        id="pfr_form"
        @submit.prevent="submitPfr"
        v-else
      >
        <div class="input-field col s12 m6">
          <input
            id="name"
            type="text"
            class="validate"
            :value="pfr.name"
            disabled
          />
          <label class="active" for="name">Your Name*</label>
        </div>
        <div class="input-field col s12 m6">
          <input id="callsign" type="text" required v-model="pfr.callsign" />
          <label for="callsign">Your Callsign*</label>
        </div>
        <div class="input-field col s12 m6">
          <select v-model="pfr.student" required class="materialize-select">
            <option value="" disabled selected>Select a controller</option>
            <option
              v-for="controller in controllers"
              :value="`${controller.fname} ${controller.lname}`"
              :key="controller.cid"
            >
              {{ controller.fname }} {{ controller.lname }}
            </option>
          </select>
          <label>Controller*</label>
        </div>
        <div class="input-field col s12 m6">
          <input id="position" type="text" required v-model="pfr.position" />
          <label for="position">Position*</label>
        </div>
        <div class="input-field col s12">
          <textarea
            id="deficiencies"
            class="materialize-textarea"
            data-length="5000"
            v-model="pfr.deficiencies"
            required
          ></textarea>
          <label for="deficiencies">Deficiencies*</label>
        </div>
        <div class="input-field col s12">
          <textarea
            id="comments"
            class="materialize-textarea"
            data-length="5000"
            v-model="pfr.comments"
          ></textarea>
          <label for="comments">Additional Comments</label>
        </div>
        <div class="input-field col s12">
          <input
            type="submit"
            class="btn waves-effect waves-light right"
            value="Send"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { zabApi } from "@/helpers/axios.js";
import { vatsimAuthRedirectUrl } from "@/helpers/uriHelper.js";

export default {
  name: "TANMAC PFR",
  title: "TANMAC PFR",
  data() {
    return {
      pfr: {
        name: "",
        callsign: "",
        student: "",
        position: "",
        deficiencies: "",
        comments: "",
      },
      controllers: null,
    };
  },
  async mounted() {
    await this.getControllers();
    M.FormSelect.init(document.querySelectorAll("select"), {});
    M.CharacterCounter.init(document.querySelectorAll("textarea"), {});
    if (this.user && this.user.isLoggedIn)
      this.pfr.name = `${this.user.data.fname} ${this.user.data.lname}`;
  },
  methods: {
    async getControllers() {
      const { data } = await zabApi.get("/feedback/controllers");
      this.controllers = data.data;
    },
    async login() {
      localStorage.setItem("redirect", this.$route.path);
      window.location.href = vatsimAuthRedirectUrl;
    },
    async submitPfr() {
      const { data } = await zabApi.post("/discord/pfr", this.pfr);
      if (data.ret_det.code === 200) {
        this.toastSuccess("PFR sent, thank you!");

        document.querySelector("#pfr_form").reset();

        this.pfr = {
          name: `${this.user.data.fname} ${this.user.data.lname}`,
          callsign: "",
          student: "",
          position: "",
          deficiencies: "",
          comments: "",
        };
        this.$nextTick(() => {
          M.textareaAutoResize(document.querySelector("textarea"));
          M.updateTextFields();
        });
      } else this.toastError(data.ret_det.message);
    },
  },
  computed: {
    ...mapState("user", ["user"]),
  },
};
</script>

<style scoped lang="scss">
.card_desc {
  margin-bottom: 1em;
}

:deep(.dropdown-content) {
  max-height: 30em;
}

.form_checkbox {
  span {
    color: black;
  }
}

.checkbox {
  padding-left: 1em;
}

input.valid[type="email"]:not(.browser-default) {
  border-bottom: 1px solid $primary-color;
  box-shadow: 0 1px 0 0 $primary-color;
}
</style>
