import $request from '@/service'

export function postUsersListData() {
  return $request.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
