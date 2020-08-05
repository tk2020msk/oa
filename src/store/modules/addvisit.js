const state = {
    currentBar:1,
    editId:0
};

const getters = {

};

const mutations = {
    merge(state,payLoad){
        Object.assign(state,payLoad);
    }
};

const actions = {

};

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}