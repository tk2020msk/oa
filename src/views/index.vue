<template>
    <div class="home">
        <div class="flex-x-left tags">
            <div class="item" v-for="item in list" :key="item.title" @click="jumpPage(item.path)">
                <van-icon :name="item.icon" color="#1989fa" size="30"/>
                <div>{{item.title}}</div>
            </div>
        </div>
        <van-button type="primary">主要按钮</van-button>
    </div>
</template>

<script>
import {Button,Icon} from 'vant';
export default {
    components:{
        [Button.name]:Button,
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
        }
    }
</style>
