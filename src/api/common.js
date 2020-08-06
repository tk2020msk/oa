import { sarsGet, sarsPost } from '@/utils/request';

//依据code查询用户信息
export function getUserInfoByCode(params) {
    return sarsPost('/common/api/getUserInfoByCode', params);
}