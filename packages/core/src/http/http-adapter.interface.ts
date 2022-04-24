import { HttpMethod } from './http-method.enum'
import { IRequestHandler } from './request-handler.interface'

export interface IHttpDriver {
  addRoute(
    method: HttpMethod,
    path: string,
    handler: IRequestHandler
  ): IHttpDriver

  addMiddleware(handler: IRequestHandler): IHttpDriver
  addMiddleware(path: string, handler: IRequestHandler): IHttpDriver
  run(port: number, message?: string)
}
