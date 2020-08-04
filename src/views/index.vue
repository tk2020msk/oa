<template>
    <div class="home">
        <div class="flex-x-left tags">
            <div class="item" v-for="item in list" :key="item.title" @click="jumpPage(item.path)">
                <van-icon :name="item.icon" color="#1989fa" size="30"/>
                <div>{{item.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {Icon} from 'vant';
export default {
    components:{
        [Icon.name]:Icon
    },
    data(){
        return {
            list:[
                {
                    title:'礼品上交',
                    icon:'gift-card',
                    path:'/present'
                },
                {
                    title:'亲属回避',
                    icon:'friends',
                    path:'/kinship'
                },
                {
                    title:'访客预约',
                    icon:'friends',
                    path:'/addvisit'
                }
            ]
        }
    },
    methods:{
        jumpPage(path){
            this.$router.push({'path':path});
        }
    },
    mounted(){

    }
}
</script>
<style scoped lang="less">
    .tags{
        margin:20px;
        flex-wrap: wrap;

        .item{
          width:25%;
          margin-bottom: 20px;
          text-align: center;
        }
    }
</style>
