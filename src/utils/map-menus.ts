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
    if (menu.children?.length) {
      for (const subMenu of menu.children) {
        console.log(1, menu.children)
        const route = localRoutes.find((item) => item.path === subMenu.url)
        if (route) {
          if (!routes.find((item) => item.path === menu.url)) {
            routes.push({ path: menu.url, redirect: route.path })
          }
          routes.push(route)
        }
        if (!firstMenu && route) {
          firstMenu = subMenu
        }
      }
    } else {
      console.log(1, menu)
      const route = localRoutes.find((item) => item.path === menu.url)
      if (route) {
        routes.push(route)
      }
    }
  }
  return routes
}

//映射路径到菜单
export function mapPathMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    if (menu.children?.length) {
      for (const subMenu of menu.children) {
        if (subMenu.url === path) {
          return subMenu
        }
      }
    } else {
      if (menu.url === path) {
        return menu
      }
    }
  }
}

//映射路径到面包屑
export function mapPathCrumb(path: string, userMenus: any[]) {
  const crumbList: any[] = []
  for (const menu of userMenus) {
    if (menu.children?.length) {
      for (const subMenu of menu.children) {
        if (subMenu.url === path) {
          crumbList.push({ name: menu.name, path: menu.url })
          crumbList.push({ name: subMenu.name, path: subMenu.url })
        }
      }
    } else {
      if (menu.url === path) {
        crumbList.push({ name: menu.name, path: menu.url })
        crumbList.push({ name: menu.name, path: menu.url })
      }
    }
  }

  return crumbList
}

//映射菜单ID
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

//映射菜单 -> 权限按钮ID
export function mapMenuListToPermissions(menuList: any[]) {
  const permissions: string[] = []
  function recurseGetPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermissions(item.children ?? [])
      }
    }
  }

  recurseGetPermissions(menuList)

  return permissions
}
