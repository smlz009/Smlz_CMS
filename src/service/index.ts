import Request from './request'
import { BASE_URL, TIME_OUT } from './config'

const $request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default $request
