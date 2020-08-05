<template>
  <div>
    <p class="title">访客信息</p>
    <div class="info">
      <van-cell title="访客姓名" :value="visitName" />
      <van-cell title="访客电话">
        <template #default>
          <a :href="'tel:' + visitPhone" class="phone">{{visitPhone}}</a>
        </template>
      </van-cell>
      <van-cell title="接待地点" :value="reception" />
      <van-cell title="访问人数" :value="visitCount" />
      <van-cell title="访客车牌" :value="plateNumber" />
      <van-cell title="到访时间" :value="visitTime" />
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="jumpUrl(1)">变更邀请</van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="jumpUrl(2)">再次邀请</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Cell } from "vant";
import { mapMutations } from "vuex";
import {subscribeDetail} from "@/api/addvisit";
export default {
  data() {
    return {
      visitId:0,
      visitName: "",
      visitPhone: "",
      reception: "",
      visitCount: "",
      plateNumber: "",
      visitTime: ""
    };
  },
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell
  },
  methods: {
    ...mapMutations("addvisit", ["merge"]),
    jumpUrl(type) {
      this.merge({
        currentBar:0,
        editId:this.visitId
      });
      this.$router.go(-1);
    }
  },
  mounted() {
    let id = this.$route.query.id;
    let jobNumber = this.$store.state.jobNumber;
    this.visitId = id;

    subscribeDetail({id,jobNumber}).then(res=>{
      let result = res.data;
      this.visitName = result.userName;
      this.visitPhone = result.mobile;
      this.reception = result.addr;
      this.visitCount = result.visitNum;
      this.plateNumber = result.carNo;
      this.visitTime = result.visitTime;
    });
  }
};
</script>

<style scoped lang="less">
.title {
  padding: 10px 15px;
}

.info {
  margin: 0 15px;

  .phone {
    color: #1989fa;
  }
}
</style>