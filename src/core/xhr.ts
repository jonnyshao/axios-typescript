import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const xhr = new XMLHttpRequest()
    responseType && (xhr.responseType = responseType)
    if (timeout) xhr.timeout = timeout
    xhr.open(method.toUpperCase(), url!, true)

    xhr.onreadystatechange = function handleLoad() {
      if (xhr.readyState !== 4 || xhr.status === 0) return
      const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? xhr.response : xhr.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }
      handleResponse(response)
    }

    xhr.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', xhr))
    }
    xhr.onerror = function handleError() {
      reject(createError('Network Error', config, null, xhr))
    }
    Object.keys(headers).forEach(name => {
      xhr.setRequestHeader(name, headers[name])
    })
    xhr.send(data)
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            xhr,
            response
          )
        )
      }
    }
  })
}
