import { createRouter, createWebHistory } from "vue-router";
import Master from "../views/layout/Master.vue";
import Admin from "../views/layout/Admin.vue";
import Event from "../views/layout/Event.vue";
import Dashboard from "../views/layout/ControllerDash.vue";
import Instructor from "../views/layout/Instructor.vue";
import { zabApi } from "../helpers/axios";
import * as uriHelper from "../helpers/uriHelper";

const routes = [
  {
    path: "/",
    component: Master,
    children: [
      {
        path: "",
        component: () => import("../views/page/Home.vue"),
      },
      {
        path: "/login",
        beforeEnter() {
          location.href = uriHelper.vatsimAuthRedirectUrl;
        },
      },
      {
        path: "/login/verify",
        component: () => import("../views/page/LoginVerify.vue"),
      },
      {
        path: "/login/discord",
        beforeEnter() {
          location.href = uriHelper.discordRedirectUrl;
        },
      },
      {
        path: "/connect/discord",
        component: () => import("../views/page/ConnectDiscord.vue"),
      },
      {
        path: "/controllers",
        component: () => import("../views/controllers/Roster.vue"),
      },
      {
        path: "/controllers/staff",
        component: () => import("../views/controllers/Staff.vue"),
      },
      {
        path: "/controllers/visit",
        component: () => import("../views/controllers/Visit.vue"),
      },
      {
        path: "/controllers/:cid",
        component: () => import("../views/controllers/Profile.vue"),
      },
      {
        path: "/events",
        component: () => import("../views/events/Index.vue"),
      },
      {
        path: "/news",
        component: () => import("../views/news/Index.vue"),
      },
      {
        path: "/news/:slug",
        component: () => import("../views/news/Item.vue"),
      },
      {
        path: "/feedback",
        component: () => import("../views/page/Feedback.vue"),
      },
      {
        path: "/files/downloads",
        component: () => import("../views/files/Downloads.vue"),
      },
      {
        path: "/files/documents",
        component: () => import("../views/files/Documents.vue"),
      },
      {
        path: "/files/documents/:slug",
        component: () => import("../views/files/ViewDocument.vue"),
      },
      {
        path: "/briefing",
        component: () => import("../views/page/PilotBrief.vue"),
      },
      {
        path: "/tanmac",
        component: () => import("../views/page/Tanmac.vue"),
      },
      {
        path: "/tanmac/pfr",
        component: () => import("../views/page/TanmacPFR.vue"),
      },
      {
        path: "/privacy-policy",
        component: () => import("../views/page/PrivacyPolicy.vue"),
      },
    ],
  },
  {
    path: "/events/:slug",
    component: Event,
    children: [
      {
        path: "",
        component: () => import("../views/events/Event.vue"),
      },
    ],
  },
  {
    path: "/ins",
    component: Instructor,
    meta: { isIns: true },
    children: [
      {
        path: "",
        component: () => import("../views/instructor/Index.vue"),
      },
      {
        path: "controllers",
        component: () => import("../views/instructor/controllers/Index.vue"),
      },
      {
        path: "controllers/:cid",
        component: () => import("../views/instructor/controllers/Edit.vue"),
      },
      {
        path: "solo",
        component: () => import("../views/instructor/solocerts/Index.vue"),
      },
      {
        path: "solo/new",
        component: () => import("../views/instructor/solocerts/New.vue"),
      },
      {
        path: "training/requests",
        component: () => import("../views/instructor/training/Requests.vue"),
      },
      {
        path: "training/requests/:date",
        component: () => import("../views/instructor/training/Day.vue"),
      },
      {
        path: "training/sessions",
        component: () => import("../views/instructor/training/Sessions.vue"),
      },
      {
        path: "training/sessions/:cid",
        component: () =>
          import("../views/instructor/training/UserSessions.vue"),
      },
      {
        path: "training/session/edit/:id",
        component: () => import("../views/instructor/training/EditSession.vue"),
      },
      {
        path: "training/session/:id",
        component: () => import("../views/instructor/training/ViewSession.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: Admin,
    meta: { isAdmin: true },
    children: [
      {
        path: "",
        component: () => import("../views/admin/Index.vue"),
      },
      {
        path: "controllers",
        component: () => import("../views/admin/controllers/Index.vue"),
      },
      {
        path: "controllers/:cid",
        component: () => import("../views/admin/controllers/Edit.vue"),
      },
      {
        path: "activity",
        component: () => import("../views/admin/controllers/Activity.vue"),
      },
      {
        path: "events",
        component: () => import("../views/admin/events/Index.vue"),
      },
      {
        path: "events/new",
        component: () => import("../views/admin/events/New.vue"),
      },
      {
        path: "events/edit/:slug",
        component: () => import("../views/admin/events/Edit.vue"),
      },
      {
        path: "events/assign/:slug",
        component: () => import("../views/admin/events/Assign.vue"),
      },
      {
        path: "news",
        component: () => import("../views/admin/news/Index.vue"),
      },
      {
        path: "news/new",
        component: () => import("../views/admin/news/New.vue"),
      },
      {
        path: "news/:slug",
        component: () => import("../views/admin/news/Edit.vue"),
      },
      {
        path: "files/downloads",
        component: () => import("../views/admin/files/downloads/Index.vue"),
      },
      {
        path: "files/downloads/new",
        component: () => import("../views/admin/files/downloads/New.vue"),
      },
      {
        path: "files/downloads/:id",
        component: () => import("../views/admin/files/downloads/Edit.vue"),
      },
      {
        path: "files/documents",
        component: () => import("../views/admin/files/documents/Index.vue"),
      },
      {
        path: "files/documents/new",
        component: () => import("../views/admin/files/documents/New.vue"),
      },
      {
        path: "files/documents/:id",
        component: () => import("../views/admin/files/documents/Edit.vue"),
      },
      {
        path: "feedback",
        component: () => import("../views/admin/feedback/Index.vue"),
      },
      {
        path: "visit/applications",
        component: () => import("../views/admin/VisitApplications.vue"),
      },
      {
        path: "absence",
        component: () => import("../views/admin/absence/Index.vue"),
      },
      {
        path: "absence/new",
        component: () => import("../views/admin/absence/New.vue"),
      },
      {
        path: "log",
        component: () => import("../views/admin/log/Index.vue"),
      },
    ],
  },
  {
    path: "/dash",
    component: Dashboard,
    meta: { loggedIn: true },
    children: [
      {
        path: "",
        component: () => import("../views/dashboard/Index.vue"),
      },
      {
        path: "profile",
        component: () => import("../views/dashboard/Edit.vue"),
      },
      {
        path: "feedback",
        component: () => import("../views/dashboard/Feedback.vue"),
      },
      {
        path: "training",
        component: () => import("../views/dashboard/training/Index.vue"),
      },
      {
        path: "training/new",
        component: () => import("../views/dashboard/training/Request.vue"),
      },
      {
        path: "training/session/:id",
        component: () => import("../views/dashboard/training/ViewSession.vue"),
      },
    ],
  },
  {
    path: "/ids",
    component: () => import("../views/page/Ids.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: Master,
    children: [
      {
        path: "/:catchAll(.*)",
        component: () => import("../views/page/404.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const tooltips = document.querySelectorAll(".tooltipped");
  tooltips.forEach((tip) => {
    const inst = M.Tooltip.getInstance(tip);
    if (inst) {
      inst.destroy();
    }
  });
  window.scrollTo({
    top: 0,
  });
  if (to.meta.loggedIn) {
    const { data: user } = await zabApi.get("/user");
    if (user.ret_det.code === 200 && user.data.member === true) {
      next();
    } else {
      next("/");
    }
  } else if (to.meta.isAdmin) {
    // Route is an admin route.
    const { data: user } = await zabApi.get("/user");
    if (user.ret_det.code === 200 && user.data.isStaff === true) {
      next();
    } else {
      next("/");
    }
  } else if (to.meta.isIns) {
    // Route is an admin route.
    const { data: user } = await zabApi.get("/user");
    if (user.ret_det.code === 200 && user.data.isIns === true) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
