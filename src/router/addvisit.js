export default [
    {
        path:'/addvisit',
        component:()=>import('../views/addvisit/index.vue'),
        meta: {
          title: '访客预约',
          keepAlive: false
        }
    },
    {
        path:'/addvisit/detail',
        component:()=>import('../views/addvisit/detail.vue'),
        meta: {
          title: '访客预约',
          keepAlive: false
        }
    }
]