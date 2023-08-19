import $request from '@/service'

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
