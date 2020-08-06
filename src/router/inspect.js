export default [
    {
        path: '/kinship',
        component: () => import('../views/inspect/kinship.vue'),
        meta: {
            title: '亲属回避',
            keepAlive: false
        }
    },
    {
        path: '/present',
        component: () => import('../views/inspect/present.vue'),
        meta: {
            title: '礼品上交',
            keepAlive: false
        }
    },
    {
        path: '/kinship/search',
        component: () => import('../views/inspect/search.vue'),
        meta: {
            title: '亲属回避',
            keepAlive: false
        }
    }
]