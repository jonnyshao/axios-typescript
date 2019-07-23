import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  }
}
const methodsWithoutData = ['get', 'delete', 'options']
methodsWithoutData.forEach(method => {
  defaults.headers[method] = {}
})
const methodsWithDate = ['post', 'put', 'patch']
methodsWithDate.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/json;charset utf-8'
  }
})
export default defaults
