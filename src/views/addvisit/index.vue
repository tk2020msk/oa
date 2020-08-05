<template>
  <div>
    <van-form v-if="activeBar == 0" @submit="onSubmit" class="bookWrap">
      <p class="title">访客信息</p>
      <div class="info">
        <van-field
          v-model="visitName"
          label="姓名"
          placeholder="请输入访客姓名"
          input-align="right"
          :rules="[{ required: true, message: '请输入访客姓名' }]"
        />
        <van-field
          v-model="visitPhone"
          type="tel"
          label="手机"
          placeholder="请输入访客电话"
          input-align="right"
          maxlength="11"
          :rules="[{ required: true, message: '请输入访客电话' }]"
        />
        <van-field
          v-model="plateNumber"
          type="tel"
          label="车牌"
          placeholder="请输入车牌号"
          input-align="right"
          :rules="[{ required: true, message: '请输入车牌号' }]"
        />
      </div>
      <p class="title">访问信息</p>
      <div class="info">
        <van-field
          readonly
          clickable
          name="picker"
          :value="reception"
          label="接待地点"
          placeholder="点击选择城市"
          @click="showReception = true"
          input-align="right"
          right-icon="arrow"
          :rules="[{ required: true, message: '请选择城市' }]"
        />
        <van-popup v-model="showReception" position="bottom">
          <van-picker
            show-toolbar
            :columns="receptionList"
            @confirm="confirmReception"
            @cancel="showReception = false"
          />
        </van-popup>
        <van-field
          v-model="visitCount"
          type="number"
          label="访问人数"
          placeholder="请输入访问人数"
          input-align="right"
          :rules="[{ required: true, message: '请输入访问人数' }]"
        />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="visitTime"
          label="到访时间"
          placeholder="请选择到访时间"
          @click="showDateTime = true"
          input-align="right"
          right-icon="arrow"
          :rules="[{ required: true, message: '请选择到访时间' }]"
        />
        <van-popup v-model="showDateTime" position="bottom">
          <van-datetime-picker
            type="datetime"
            :min-date="minDate"
            :filter="filterDateTime"
            :max-minute="30"
            @confirm="confirmDateTime"
            @cancel="showDateTime = false"
          />
        </van-popup>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <ul v-else class="visitList">
      <li v-for="(item,index) in visitArr" :key="index">
        <p class="time">{{item.visitDate}}</p>
        <div class="info" :class="{'more':idx >1}" v-for="(itm,idx) in item.visitList" :key="idx"  @click="jumpDetail(itm.id)">
          <div class="nameWrap flex-x-between">
            <div class="name">{{itm.userName}}</div>
            <div class="state">{{itm.statusDesc}}</div>
          </div>
          <div class="flex-x-left">
            <van-icon name="phone-o" size="16" />
            <div class="title">访客电话</div>
            <div class="cont">{{itm.mobile}}</div>
          </div>
          <div class="flex-x-left">
            <van-icon name="wap-home-o" size="16" />
            <div class="title">访问地点</div>
            <div class="cont">{{itm.addr}}</div>
          </div>
          <div class="flex-x-left">
            <van-icon name="contact" size="16" />
            <div class="title">访问人数</div>
            <div class="cont">{{itm.visitNum}}</div>
          </div>
          <div class="flex-x-left">
            <van-icon name="contact" size="16" />
            <div class="title">访客车牌</div>
            <div class="cont">{{itm.carNo}}</div>
          </div>
          <div class="flex-x-left">
            <van-icon name="clock-o" size="16" />
            <div class="title">到访时间</div>
            <div class="cont">{{itm.visitTime}}</div>
          </div>
        </div>
      </li>
    </ul>
    <div style="height: 5rem;"></div>
    <van-tabbar v-model="activeBar" safe-area-inset-bottom @change="changeTabBar">
      <van-tabbar-item icon="add-o">新增预约</van-tabbar-item>
      <van-tabbar-item icon="records">访客记录</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import {
  Tabbar,
  TabbarItem,
  Icon,
  Button,
  Field,
  Picker,
  Popup,
  DatetimePicker,
  Form,
  Toast
} from "vant";
import dayjs from "dayjs";
import { mapState, mapMutations } from "vuex";
import {subscribeList,listAddr,subscribeDetail,subscribeApply} from "@/api/addvisit";
export default {
  data() {
    return {
      visitArr:[],
      visitName:'', //访客姓名
      visitPhone:'',//访客电话
      plateNumber:'', //车牌
      reception:'',//接待地点
      receptionId:0,
      showReception: false, //是否显示接待地点
      receptionList: [],
      visitCount:'', //访问人数
      visitTime:'',//到访时间
      showDateTime: false,
      minDate: new Date(),
      visitId:0
    };
  },
  computed: {
    activeBar: {
      get() {
        return this.$store.state.addvisit.currentBar;
      },
      set(val) {
        this.merge({
          currentBar:val
        });
      }
    },
    ...mapState(['jobNumber'])
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Form.name]: Form
  },
  methods: {
    ...mapMutations("addvisit", ["merge"]),
    confirmReception(data) {
      this.reception = data.text;
      this.receptionId = data.id;
      this.showReception = false;
    },
    confirmDateTime(value) {
      this.visitTime = dayjs(value).format("YYYY/MM/DD HH:mm:ss");
      this.showDateTime = false;
    },
    filterDateTime(type, options) {
      if (type === "minute") {
        return options.filter(option => option % 30 === 0 || option === 0);
      }
      return options;
    },
    onSubmit() {
      debugger;
      let params = {
        jobNumber:this.jobNumber,
        userName:this.visitName,
        mobile:this.visitPhone,
        addrId:this.receptionId,
        visitNum:this.visitCount,
        visitTime:this.visitTime
      };
      if(this.visitId){
        params.id = this.visitId;
      }
      subscribeApply(params).then(res=>{
        Toast('提交成功');
      });
    },
    jumpDetail(id) {
      this.$router.push({ path: `/addvisit/detail`,query:{id} });
    },
    changeTabBar(index){
      if(index == 0){
        this.visitName = '';
        this.visitPhone = '';
        this.reception = '';
        this.visitCount = '';
        this.plateNumber = '';
        this.visitTime = '';
      }else{
        this.getSubscribeList();
      }
    },
    //预约地址
    getAddressList(){
      listAddr().then(res=>{
        this.receptionList = res.data.map(item=>{
          return {
            id:item.id,
            text:item.addr
          }
        });
      });
    },
    //访客记录
    getSubscribeList(){
      subscribeList({jobNumber:this.jobNumber}).then(res=>{
       this.visitArr = res.data;
      });
    },
    getSubscribeDetail(id){
      subscribeDetail({id,jobNumber:this.jobNumber}).then(res=>{
        let result = res.data;
        this.visitName = result.userName;
        this.visitPhone = result.mobile;
        this.reception = result.addr;
        this.visitCount = result.visitNum;
        this.plateNumber = result.carNo;
        this.visitTime = result.visitTime;
      });
    }
  },
  mounted() {
    let id = this.$store.state.addvisit.editId;
    let currentBar = this.$store.state.addvisit.currentBar;
    this.visitId = id || 0;
     if(currentBar == 0){
        if(id){
          this.getSubscribeDetail(id);
        }
        this.getAddressList();
      }else{
        this.getSubscribeList();
      }
  }

};
</script>

<style scoped lang="less">
.bookWrap {
  .title {
    padding: 10px 15px;
  }

  .info {
    margin: 0 15px;
  }
}

.visitList {
  li {
    padding: 10px;

    .time {
      margin-bottom: 10px;
    }

    .info {
      background: #fff;
      border-radius: 5px;
      padding: 10px;

      .nameWrap {
        .state {
          line-height: 24px;
          background: #fcedea;
          color: #dc1c21;
          min-width: 68px;
          text-align: center;
          border-radius: 20px;
        }
      }

      > div {
        margin-bottom: 10px;

        .title {
          margin: 0 10px;
        }
      }

      &.more{
        margin-bottom: 15px;
      }
    }
  }
}
</style>