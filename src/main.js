import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/common.less';
import '@/style/variables.less';
import 'amfe-flexible';
import 'utils/permission';




Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
