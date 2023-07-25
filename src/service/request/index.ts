import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig } from './type'

class Request {
  instance: AxiosInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config) //axios实例

    //请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    //响应拦截器
    this.instance.interceptors.response.use(
      (config) => {
        return config.data
      },
      (err) => {
        return err
      }
    )

    //针对特定的配置 添加拦截器
    this.instance.interceptors.request.use(
      // 单次请求的成功拦截处理
      config.interceptors?.requestSuccessFn as (
        value: InternalAxiosRequestConfig
      ) => InternalAxiosRequestConfig,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  //封装网络请求方法
  request<T = any>(config: RequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors?.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors?.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
