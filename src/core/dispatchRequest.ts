import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { transformRequest, transformResponse } from '../helpers/data'
import { buildURL } from '../helpers/url'
import { processHeaders, flattenHeaders } from '../helpers/headers'
import xhr from './xhr'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => transformResponsetData(res))
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformResponsetData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
