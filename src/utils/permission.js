import router from '@/router';
import store from '@/store';
import { getUserInfoByCode } from '@/api/common';
const whiteList = ['/','/404'];

router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'H5Vue';
  // if(whiteList.includes(to.path)){
  //   next();
  // }else if(store.state.jobNumber){
  //   next();
  // }else {
  //   let code = 'qw9N9WT93u6FszRIytG8cyesZmtAvp7YzvZShHp49QI';
  //   if (code) {
  //     let result;
  //     try {
  //       result = await getUserInfoByCode({ code });
  //     } catch (error) {
  //       result = error;
  //     }
  //     if (result.code == 200) {
  //       store.commit('merge', { jobNumber: result.row.jobNumber });
  //       next();
  //     } else {
  //       next('404');
  //     }
  //   } else {
  //     next(`https://ioa.xc-inc.cn/message/common/getWeChatCode?companyId=1&redirectUrl=${encodeURIComponent('https://tcsh.xc-inc.cn/addvisit')}`)
  //   }
  // }
  store.commit('merge', { jobNumber: 202015081});
  next();
})
