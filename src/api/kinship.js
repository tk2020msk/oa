import { sarsGet } from '@/utils/request';

export function queryMerchantApply(params) {
    return sarsGet('/resources/merchant/queryMerchantApply', params)
}