export default [
    {
        path:'/present',
        name:'present',
        component:()=>import('../views/present.vue'),
        meta: {
          auth: true,
          title: '礼品上交',
          keepAlive: true
        }
    }
]