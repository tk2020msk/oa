<template>
  <div id="app" style="position: relative;height: 100%;">
    <div class="loadingWrap" v-if="showLoading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :changeLoading="changeLoading"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :changeLoading="changeLoading"></router-view>
  </div>
</template>

<script>
import { Loading } from "vant";
export default {
  name: "app",
  data() {
    return {
      showLoading: false
    };
  },
  components: {
    [Loading.name]: Loading
  },
  watch: {
    $route(to, from) {
      // if(from.path == "/addvisit" && to.path != "/addvisit/detail"){
      //   sessionStorage.removeItem('visitState');
      // }
    }
  },
  methods: {
    changeLoading(state) {
      this.showLoading = state;
    }
  }
};
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.loadingWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
