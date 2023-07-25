import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//扩展配置
export interface RInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (config: T) => T
  responseFailureFn?: (err: any) => any
}

//对axios config配置扩展 新增回调
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RInterceptors<T>
}
