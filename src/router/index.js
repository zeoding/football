import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
const Home = r => require.ensure([], () => r(require("@/view/Home")), "home");
const Match = r => require.ensure([], () => r(require("@/view/Match")), "home");
const Video = r => require.ensure([], () => r(require("@/view/Video")), "home");
const Data = r => require.ensure([], () => r(require("@/view/Data")), "home");
const ArticleDetail = r =>
  require.ensure([], () => r(require("@/view/ArticleDetail")), "home");

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/match",
      name: "match",
      component: Match
    },
    {
      path: "/video",
      name: "video",
      component: Video
    },
    {
      path: "/data",
      name: "data",
      component: Data
    },
    {
      path: "/articleDetail/:id",
      name: "articleDetail",
      component: ArticleDetail
    }
  ]
});

router.beforeEach((to, form, next) => {
  let name = to.name;
  if (name != "articleDetail") {
    store.dispatch("changeIndexTitle", name);
    const indexTitle = window.sessionStorage.getItem("indexTitle");
    if (!indexTitle) {
      window.sessionStorage.setItem("indexTitle", name);
    }
    setArticle(0);
  } else {
    setArticle(1);
  }
  function setArticle(val) {
    store.dispatch("isArticleDetail", val);
    const isArticle = window.sessionStorage.getItem("isArticle");
    if (!isArticle) {
      window.sessionStorage.setItem("isArticle", val);
    }
  }
  const navIndex = window.sessionStorage.getItem("navIndex");
  if (!navIndex) {
    let index = 0;
    switch (name) {
      case "home":
        window.sessionStorage.setItem("navIndex", 0);
        break;
      case "match":
        iwindow.sessionStorage.setItem("navIndex", 1);
        break;
      case "video":
        window.sessionStorage.setItem("navIndex", 2);
        break;
      case "data":
        window.sessionStorage.setItem("navIndex", 3);
        break;

      default:
        break;
    }
  }
  next();
});

export default router;
