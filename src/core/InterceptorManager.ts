import { ResolvedHandle, RejectedHandle } from '../types'

interface Interceptor<T> {
  resolved: ResolvedHandle<T>
  rejectd?: RejectedHandle
}

export default class InterceptroManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolvedHandle<T>, rejectd?: RejectedHandle): number {
    this.interceptors.push({
      resolved,
      rejectd
    })
    return this.interceptors.length - 1
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) fn(interceptor)
    })
  }
}
