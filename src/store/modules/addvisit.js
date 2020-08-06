const visitState = JSON.parse(sessionStorage.getItem('visitState'));

const state = {
    currentBar: visitState ? visitState.currentBar : 1,
    visitId: visitState ? visitState.visitId : 0, //详情页面带到预约页面的id
    visitType: visitState ? visitState.visitType : true// true 新增 false 编辑
};

const getters = {

};

const mutations = {
    merge(state, payLoad) {
        Object.assign(state, payLoad);
    }
};

const actions = {

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}