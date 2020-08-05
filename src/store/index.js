import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import {getUserInfoByCode} from '@/api/common';

Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
})


const vuexPersisted = new createPersistedState({
  key: 'TcshOaState',
  storage: window.sessionStorage, 
  reducer: state => ({
    editVisitId:state.addvisit.editId
  })
})

export default new Vuex.Store({
  state: {
    direction: 'forward', // 页面切换方向
    jobNumber:'' //工号
  },
  mutations: {
    // 更新页面切换方向
    updateDirection (state, direction) {
      state.direction = direction
    },
    merge(state,payLoad){
      Object.assign(state,payLoad);
    }
  },
  actions: {
   
  },
  modules,
  plugins:[vuexPersisted]
})
