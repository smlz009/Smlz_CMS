import $request from '@/service'

/** 用户数据的请求 */
export function postUsersListData(data: any) {
  return $request.post({
    url: '/users/list',
    data
  })
}

export function deleteUserById(id: number) {
  return $request.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return $request.post({
    url: `/users`,
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return $request.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

/** 页面数据的请求 */
export function postPageListData(pageName: string, data: any) {
  return $request.post({
    url: `/${pageName}/list`,
    data
  })
}

export function deletePageDataById(pageName: string, id: any) {
  return $request.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, data: any) {
  return $request.post({
    url: `/${pageName}`,
    data
  })
}

export function editPageData(pageName: string, id: number, data: any) {
  return $request.patch({
    url: `/${pageName}/${id}`,
    data
  })
}
