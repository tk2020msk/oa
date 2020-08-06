<template>
  <div class="searchWrap">
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <ul class="searchList">
      <li v-for="item in searchList" :key="item">测试11，12345，北京房控组</li>
    </ul>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  data() {
    return {
      keyword: "",
      searchList: [0, 1, 2, 3]
    };
  },
  components: {
    [Search.name]: Search
  },
  methods: {
    onSearch() {
      console.log(11);
    },
    onCancel() {
      console.log("cancle");
    }
  }
};
</script>

<style scoped lang="less">
.searchWrap {
  background: #fff;
  height: 100vh;
}

.searchList {
  li {
    padding: 5px 15px 10px;
  }
}
</style>