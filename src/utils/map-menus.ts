import type { RouteRecordRaw } from 'vue-router'

//加载本地路由
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const file: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', { eager: true })
  for (const key in file) {
    const module = file[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
//映射路由
export function mapMenusToRoutes(userMenus: any[]) {
  //获取本地路由
  const localRoutes = loadLocalRoutes()

  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) {
        routes.push(route)
      }
      if (!firstMenu && route) {
        firstMenu = subMenu
      }
    }
  }
  return routes
}

//映射路径到菜单
export function mapPathMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}
