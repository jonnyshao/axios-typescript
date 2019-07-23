import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolvedHandle,
  RejectedHandle
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptroManager from './InterceptorManager'
interface Interceptors {
  request: InterceptroManager<AxiosRequestConfig>
  response: InterceptroManager<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolvedHandle<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedHandle
}
function requestMethodWithoutData(
  this: Axios,
  method: Method,
  url: string,
  config?: AxiosRequestConfig
): AxiosPromise {
  return this.request(
    Object.assign(config || {}, {
      method,
      url
    })
  )
}
function requestMethodWithData(
  this: Axios,
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  return this.request(
    Object.assign(config || {}, {
      method,
      url,
      data
    })
  )
}
export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  constructor(instanceConfig: AxiosRequestConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new InterceptroManager<AxiosRequestConfig>(),
      response: new InterceptroManager<AxiosResponse>()
    }
  }
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }
    const chain: PromiseChain<any>[] = [{ resolved: dispatchRequest, rejected: undefined }]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return requestMethodWithoutData.call(this, 'get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return requestMethodWithoutData.call(this, 'delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return requestMethodWithoutData.call(this, 'head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return requestMethodWithoutData.call(this, 'options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return requestMethodWithData.call(this, 'post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return requestMethodWithData.call(this, 'put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return requestMethodWithData.call(this, 'patch', url, data, config)
  }
}
