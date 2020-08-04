export default [
    {
        path:'/addvisit',
        component:()=>import('../views/addvisit/index.vue'),
        meta: {
          title: '访客预约',
          keepAlive: false
        },
        children:[{
            path:'detail',
            component:()=>import('../views/addvisit/detail.vue'),
            meta: {
              title: '访客预约',
              keepAlive: false
            }
        }]
    }
    // {
    //     path:'/visitdetail',
    //     component:()=>import('../views/addvisit/detail.vue'),
    //     meta: {
    //       title: '访客预约',
    //       keepAlive: false
    //     }
    // },
]