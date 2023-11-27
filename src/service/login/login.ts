import $request from '..'
import type { IAccount } from '@/types'

export function createLoginRequset(account: IAccount) {
  return $request.post({
    url: '/user/create',
    data: account
  })
}

export function accountLoginRequset(account: IAccount) {
  return $request.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return $request.get({
    url: `/user/${id}`
  })
}

export function getUserMenuByRoleId(id: number) {
  return $request.get({
    url: `/role/${id}/menu`
  })
}
