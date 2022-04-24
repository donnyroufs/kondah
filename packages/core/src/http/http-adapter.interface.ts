import { HttpMethod } from './http-method.enum'
import { IResponse, RequestHandler } from './request-handler'

export interface IHttpDriver<TRequest, TResponse extends IResponse, TDriver> {
  addRoute(
    method: HttpMethod,
    path: string,
    handler: RequestHandler<TRequest, TResponse>
  ): IHttpDriver<TRequest, TResponse, TDriver>

  addMiddleware(
    handler: RequestHandler<TRequest, TResponse>
  ): IHttpDriver<TRequest, TResponse, TDriver>

  addMiddleware(
    path: string,
    handler: RequestHandler<TRequest, TResponse>
  ): IHttpDriver<TRequest, TResponse, TDriver>

  run(port: number, message?: string): Promise<void>
}
