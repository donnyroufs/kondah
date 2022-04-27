import { Server } from 'http'
import { IBoot } from '..'

import { HttpMethod } from './http-method.enum'
import { RequestHandler } from './request-handler'

export interface IHttpDriver<TRequest, TResponse, TDriver> extends IBoot {
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

  sendJson<TData>(res: TResponse, data: TData): void

  run(port: number, message?: string): Promise<void>

  getServer(): Server
}
