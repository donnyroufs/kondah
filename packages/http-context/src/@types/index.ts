import { HttpContext } from '../http.context'

declare module '@kondah/core' {
  interface AppContext {
    addToHttpContext<T>(key: string, fn: T): void
  }

  interface IKondahRequestData {
    httpContext: HttpContext
  }
}

export {}
