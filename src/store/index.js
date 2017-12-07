import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
Vue.use(Vuex);
const state = {
  indexTitle: "home", //路由地址
  navIndex: 0, //导航菜单下标
  isArticle: 0
};
const getters = {
  indexTitle: state => state.indexTitle,
  navIndex: state => state.navIndex,
  isArticle: state => state.isArticle
};
const actions = {
  changeIndexTitle({ commit }, indexTitle) {
    commit(types.SAVE_INDEX_TITLE, indexTitle);
  },
  changeNavIndex({ commit }, navIndex) {
    commit(types.SAVE_NAV_INDEX, navIndex);
  },
  isArticleDetail({ commit }, isArticle) {
    commit("isDetail", isArticle);
  }
};
const mutations = {
  isDetail(state, isArticle) {
    state.isArticle = isArticle;
    if (window.sessionStorage && window.sessionStorage.isArticle) {
      window.sessionStorage.setItem("isArticle", isArticle);
    }
  },
  [types.SAVE_INDEX_TITLE](state, indexTitle) {
    state.indexTitle = indexTitle;
    if (window.sessionStorage && window.sessionStorage.indexTitle) {
      window.sessionStorage.setItem("indexTitle", indexTitle);
    }
  },
  [types.SAVE_NAV_INDEX](state, navIndex) {
    state.navIndex = navIndex;
    if (window.sessionStorage && window.sessionStorage.navIndex) {
      window.sessionStorage.setItem("navIndex", navIndex);
    }
  }
};
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

export default store;
