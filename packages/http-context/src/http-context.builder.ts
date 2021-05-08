import { HttpContext } from './http.context'

export class HttpContextBuilder {
  private _httpContext = new HttpContext()

  // TODO: Types
  constructor(req, res, logger) {
    this._httpContext.req = req
    this._httpContext.res = res
    this._httpContext.logger = logger
  }

  public add<T = unknown>(key: string, value: T) {
    this._httpContext[key] = value
    return this
  }

  public addMany(data: Record<string, unknown>) {
    Object.entries(data).forEach(([k, v]) => {
      this._httpContext[k] = v
    })
    return this
  }

  build() {
    return this._httpContext
  }
}
