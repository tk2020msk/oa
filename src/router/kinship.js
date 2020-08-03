export default [
    {
        path:'/kinship',
        name:'kinship',
        component:()=>import('../views/kinship.vue'),
        meta: {
          auth: true,
          title: '亲属回避',
          keepAlive: true
        }
    }
]