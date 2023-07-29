import $request from '..'
import type { IAccount } from '@/types'

export function accountLoginRequset(account: IAccount) {
  return $request.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return $request.get({
    url: `/users/${id}`
  })
}
