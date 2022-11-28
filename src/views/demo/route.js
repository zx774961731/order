const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Demo',
  path: '/demo',
  component: Layout,
  redirect: '/demo/createOrder',
  isHidden: true,
  meta: {
    title: '用户',
    customIcon: 'logo',
    role: ['admin'],
    requireAuth: true,
    order: 3,
  },
  children: [
    {
      name: 'createOrder',
      path: 'createOrder',
      component: () => import('./CreateOrder.vue'),
      meta: {
        title: '创建工单',
        icon: 'ic:baseline-table-view',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'orderDetail',
      path: '/orderDetail',
      component: () => import('./OrderDetail.vue'),
      isHidden: true,
      content: '工单详情',
    },
    {
      name: 'recordTable',
      path: 'record-table',
      component: () => import('./table/record-list.vue'),
      meta: {
        title: '我的服务记录',
        icon: 'ic:baseline-table-view',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'todoTable',
      path: 'todo-table',
      component: () => import('./table/todo-table.vue'),
      meta: {
        title: '待办工单',
        icon: 'ic:baseline-table-view',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'doneTable',
      path: 'done-table',
      component: () => import('./table/done-table.vue'),
      meta: {
        title: '经办工单',
        icon: 'ic:baseline-table-view',
        role: ['admin'],
        requireAuth: true,
        keepAlive: true,
      },
    },
  ],
}
