import type { Route } from '#/global'
import type { RouteRecordRaw } from 'vue-router'
import useSettingsStore from '@/store/modules/settings'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:meta-layouts'
import MultilevelMenuExample from './modules/multilevel.menu.example'

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
        meta: {
          title: () => useSettingsStore().settings.home.title,
          icon: 'i-ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '内容1',
      icon: 'i-uim:box',
    },
    children: [
      // 分类
      // 文章
      // 标签
      // 页面
      MultilevelMenuExample,
    ],
  },
  {
    meta: {
      title: '系统',
      icon: 'i-uim:box',
    },
    children: [
      MultilevelMenuExample,
      // 菜单
      // 角色
      // 用户
      // 日志
      // 配置
      // 字典
    ],
  },
]

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))

export {
  // 动态路由 通过接口获取
  asyncRoutes,
  asyncRoutesByFilesystem,
  // 固定路由
  constantRoutes,
  constantRoutesByFilesystem,
  // 系统路由
  systemRoutes,
}
