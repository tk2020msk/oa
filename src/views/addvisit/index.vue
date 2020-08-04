<template>
    <div>
        <div v-if="activeBar == 0" class="bookWrap">
            <p class="title">访客信息</p>
            <div class="info">
                 <van-field v-model="visitName" label="姓名" placeholder="请输入访客姓名" />
                 <van-field v-model="visitPhone" type="tel" label="手机" placeholder="请输入访客电话" />
                 <van-field v-model="plateNumber" type="tel" label="车牌" placeholder="请输入车牌号" />
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
                />
                <van-popup v-model="showReception" position="bottom">
                    <van-picker
                        show-toolbar
                        :columns="receptionList"
                        @confirm="confirmReception"
                        @cancel="showReception = false"
                    />
                </van-popup>
                <van-field v-model="visitCount" type="number" label="访问人数" placeholder="请输入访问人数" />
                <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="visitTime"
                    label="到访时间"
                    placeholder="请选择到访时间"
                    @click="showDateTime = true"
                    />
                <van-popup v-model="showDateTime" position="bottom">
                    <van-datetime-picker
                        type="datetime"
                        :min-date="minDate"
                        :filter="filterDateTime"
                        @confirm="confirmDateTime"
                        @cancel="showDateTime = false"
                    />
                </van-popup>
            </div>
        </div>
        <ul v-else class="visitList">
            <li v-for="item in visitList" :key="item">
                <p class="time">2020年8月1号</p>
                <div class="info">
                    <div class="nameWrap flex-x-between">
                        <div class="name">常晓娟</div>
                        <div class="state">未到访</div>
                    </div>
                    <div class="flex-x-left">
                        <van-icon name="phone-o" size="16" /><div class="title">访客电话</div><div class="cont">18362726684</div>
                    </div>
                    <div class="flex-x-left">
                        <van-icon name="wap-home-o" size="16" /><div class="title">访问地点</div><div class="cont">同程大厦</div>
                    </div>
                    <div class="flex-x-left">
                        <van-icon name="contact" size="16" /><div class="title">访问人数</div><div class="cont">1</div>
                    </div>
                    <div class="flex-x-left">
                        <van-icon name="contact" size="16" /><div class="title">访客车牌</div><div class="cont">苏EY62E9</div>
                    </div>
                    <div class="flex-x-left">
                        <van-icon name="clock-o" size="16" /><div class="title">到访时间</div><div class="cont">2020-08-01 09:00</div>
                    </div>
                </div>
            </li>
        </ul>
        <div style="height: 5rem;"></div>
        <van-tabbar v-model="activeBar" safe-area-inset-bottom>
             <van-tabbar-item icon="add-o">新增预约</van-tabbar-item>
             <van-tabbar-item icon="records">访客记录</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import {Tabbar,TabbarItem,Icon,Button,Field,Picker,Popup,DatetimePicker} from 'vant';
import dayjs from 'dayjs';
export default {
    data(){
       return {
          activeBar:1,
          visitList:[0,1,2,3,4],
          visitName:'', //访客姓名
          visitPhone:'',//访客电话
          plateNumber:'', //车牌
          reception:'',//接待地点
          showReception:false, //是否显示接待地点
          receptionList:['同程大厦'],
          visitCount:'', //访问人数
          visitTime:'',//到访时间
          showDateTime:false,
          minDate: new Date()
       }
    },
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem,
        [Icon.name]:Icon,
        [Button.name]:Button,
        [Field.name]: Field,
        [Picker.name]:Picker,
        [Popup.name]:Popup,
        [DatetimePicker.name]:DatetimePicker
    },
    methods:{
        confirmReception(value){
            this.reception = value;
            this.showReception = false; 
        },
        confirmDateTime(value){
            this.visitTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss') ;
            this.showDateTime = false;
        },
        filterDateTime(type, options){
            if (type === 'minute') {
                return options.filter((option) => option % 30 === 0 || option === 0);
            }
            return options;
        },
        formatterDate(type,val){
            
        }
    },
    mounted(){

    }
}
</script>

<style scoped lang="less">
    .visitList{
        li{
            padding: 10px;

            .time{
                margin-bottom: 10px;
            }

            .info{
                background: #fff;
                border-radius: 5px;
                padding: 10px;

                .nameWrap{
                    .state{
                        line-height: 24px;
                        background: #fcedea;
                        color: #dc1c21;
                        min-width:68px;
                        text-align: center;
                        border-radius: 20px;
                    }
                }

                > div{
                    margin-bottom: 10px;

                    .title{
                        margin:0 10px;
                    }
                }
            }
        }
    }
</style>