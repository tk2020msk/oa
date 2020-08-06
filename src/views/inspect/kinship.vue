<template>
  <div>
    <van-tabs v-model="activeTab" color="#1989fa">
      <van-tab title="登记">
        <van-form @submit="onSubmit" class="myForm">
          <van-field
            label="亲属姓名"
            placeholder="请选择"
            readonly
            v-model="name"
            :rules="[{ required: true, message: '请选择亲属姓名'}]"
            @click="jumpSearch"
          />
          <van-field label="亲属职级" v-model="level" readonly />
          <van-field label="入职日期" v-model="boardDate" readonly />
          <van-field label="所在部门" v-model="department" readonly />
          <van-field
            readonly
            clickable
            :value="relation"
            label="与申报人关系"
            placeholder="请选择"
            @click="showRelation = true"
            :rules="[{ required: true, message: '请选择与申报人关系'}]"
          />
          <van-popup v-model="showRelation" position="bottom">
            <van-picker
              show-toolbar
              :columns="RelationList"
              @confirm="confirmRelation"
              @cancel="showRelation = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            :value="solution"
            label="解决方式"
            placeholder="请选择"
            @click="showSolution = true"
            :rules="[{ required: true, message: '请选择解决方式'}]"
          />
          <van-popup v-model="showSolution" position="bottom">
            <van-picker
              show-toolbar
              :columns="solutionList"
              @confirm="confirmSolution"
              @cancel="showSolution = false"
            />
          </van-popup>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="登记列表">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getBookList"
          >
            <div class="bookList" v-for="item in bookList" :key="item">
              <div class="nameWrap flex-x-between">
                <div class="name">任悦1111767</div>
                <div class="relation">夫妻</div>
              </div>
              <div class="bookTime">登记时间：2020-07-20</div>
              <div class="solution">解决方式：报备</div>
              <div class="remark">是否备案：未备案</div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  Tab,
  Tabs,
  Form,
  Field,
  Picker,
  Popup,
  Button,
  PullRefresh,
  List,
  Cell
} from "vant";
import { queryMerchantApply } from "@/api/kinship";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell
  },
  data() {
    return {
      activeTab: 0,
      name: "", //亲属姓名
      level: "", //亲属职级
      boardDate: "", //入职日期
      department: "", //所在部门
      solution: "", //解决方式
      showSolution: false,
      solutionList: [
        "报备",
        "无需报备",
        "本人内部调动",
        "对方内部调动",
        "本人离职",
        "对方离职"
      ],
      relation: "", //与申报人关系
      showRelation: false,
      RelationList: [
        {
          text: "直系",
          children: [
            { text: "夫妻" },
            { text: "父子(包括女儿)" },
            { text: "母子(包括女儿)" }
          ]
        },
        {
          text: "旁系",
          children: [
            { text: "伯侄" },
            { text: "叔侄" },
            { text: "姑侄" },
            { text: "舅甥" },
            { text: "姨甥" },
            { text: "亲兄弟姐妹" }
          ] //写死数据 数据没写完
        }
      ],
      bookList: [], //登记列表
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  methods: {
    onSubmit() {},
    confirmSolution(value, index) {
      this.solution = value;
      this.showSolution = false;
    },
    confirmRelation(value, index) {
      this.relation = value.join(" ");
      this.showRelation = false;
    },
    getBookList() {
      setTimeout(() => {
        if (this.refreshing) {
          this.bookList = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.bookList.push(this.bookList.length + 1);
        }
        this.loading = false;

        if (this.bookList.length >= 20) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.getBookList();
    },
    jumpSearch() {
      this.$router.push({ path: "/kinship/search" });
    }
  },
  mounted() {
    queryMerchantApply({ id: 149 })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="less">
.myForm {
  margin-top: 10px;
}

.bookList {
  padding: 10px 20px;
  background: #fff;
  margin: 10px 0;

  .nameWrap {
    .name {
      font-size: 20px;
    }

    .relation {
      min-width: 68px;
      text-align: center;
      padding: 5px 10px;
      border-radius: 20px;
      background: #d8e7fc;
      color: #1989fa;
    }
  }

  .bookTime {
    margin-top: 10px;
  }

  .solution {
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 10px;
  }

  .remark {
    margin-top: 10px;
  }
}
</style>