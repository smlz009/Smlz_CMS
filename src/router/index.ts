import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import useMainStore from '@/store/main/mian'

const router = createRouter({
  history: createWebHashHistory(), //hash模式
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/Main.vue'),
      children: [
        {
          path: '/main/system/role',
          component: () => import('@/views/main/system/role/role.vue'),
          name: '角色管理'
        },
        {
          path: '/main/system/menu',
          name: '菜单管理',
          component: () => import('@/views/main/system/menu/menu.vue')
        }
      ]
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

//导航守卫
router.beforeEach((to) => {
  // const token = localCache.getCache(LOGIN_TOKEN)
  // if (to.path.startsWith('/main') && !token) {
  //   return '/login'
  // }
  // if (to.path === '/main') {
  //   return firstMenu.url
  // }
  //缓存到头部
  // useMainStore().addAffixListAction(to)
})

export default router
