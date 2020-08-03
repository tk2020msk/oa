<template>
    <div>
        
    </div>
</template>

<script>
import {NavBar, Button } from 'vant';
import {queryMerchantApply} from '@/api/kinship';
export default {
    components:{
        [NavBar.name]:NavBar,
        [Button.name]:Button
    },
    data(){
        return {

        }
    },
    methods:{
      
    },
    mounted(){
        queryMerchantApply({id:149}).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }
}
</script>

<style scoped lang="less">

</style>