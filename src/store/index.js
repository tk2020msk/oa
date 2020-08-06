import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
})


const visitPersisted = new createPersistedState({
  key: 'visitState',
  storage: window.sessionStorage,
  reducer: state => ({
    currentBar: state.addvisit.currentBar,
    visitId: state.addvisit.visitId,
    visitType: state.addvisit.visitType
  })
})

const commonPersisted = new createPersistedState({
  key: 'commonState',
  storage: window.sessionStorage,
  reducer: state => ({
    jobNumber: state.jobNumber
  })
})

export default new Vuex.Store({
  state: {
    direction: 'forward', // 页面切换方向
    jobNumber: '', //工号
  },
  mutations: {
    // 更新页面切换方向
    updateDirection(state, direction) {
      state.direction = direction
    },
    merge(state, payLoad) {
      Object.assign(state, payLoad);
    }
  },
  actions: {

  },
  modules,
  plugins: [visitPersisted, commonPersisted]
})
