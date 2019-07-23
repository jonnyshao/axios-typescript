import { AxiosRequestConfig } from '../types'
import { isPlainObject } from './utils'
import { deepMerge } from './utils'
const strats = Object.create(null)
function defaultStrat(source: any, target: any) {
  return typeof target !== void 0 ? target : source
}
function fromTargetStrat(source: any, target: any) {
  return typeof target !== void 0 && target
}
;['url', 'params', 'data'].forEach(key => {
  strats[key] = fromTargetStrat
})

function deepMergeStrat(source: any, target: any) {
  if (!isPlainObject(target)) {
    return deepMerge(source, target)
  } else if (typeof target !== void 0) {
    return target
  } else if (isPlainObject(source)) {
    return deepMerge(source)
  } else if (typeof source !== void 0) {
    return source
  }
}
;['headers'].forEach(key => (strats[key] = deepMergeStrat))
export function mergeConfig(source: AxiosRequestConfig, target: AxiosRequestConfig) {
  target = target || {}
  const config = Object.create(null)
  for (let key in target) {
    mergeField(key)
  }
  for (let key in source) {
    if (!target[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat[(source[key], target![key])]
  }
  return config
}
