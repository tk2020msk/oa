import {sarsGet,sarsPost} from '@/utils/request';

//访客预约列表
export function subscribeList(params){
    return sarsPost('/visit/subscribe/list',params);
}

//到访预约详情
export function subscribeDetail(params){
    return sarsPost('/visit/subscribe/detail',params);
}

//预约申请
export function subscribeApply(params){
    return sarsPost('/visit/subscribe/apply',params);
}

//获取预约地址
export function listAddr(params){
    return sarsGet('/visit/subscribe/listAddr',params);
}