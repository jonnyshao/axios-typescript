import { isPlainObject, deepMerge } from './utils'
import { Method } from '../types'
function normalizeHeaderName(headers: any): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (/Content-type/gi.test(name)) {
      headers['Content-Type'] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers)
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed: any = {}
  if (!headers) return parsed
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) val = val.trim()
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers
  headers = deepMerge(headers.common, headers[method], headers)
  ;['get', 'delete', 'put', 'post', 'patch', 'common', 'options'].forEach(method => {
    delete headers[method]
  })
  return headers
}
