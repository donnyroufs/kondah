import { Server } from 'http'
import { IBoot } from '..'

import { HttpMethod } from './http-method.enum'
import { HttpStatusCode } from './http-status.enum'
import { IKondahDriver } from './kondah-driver.interface'
import { IKondahRequest } from './kondah-request.interface'
import { IKondahResponse } from './kondah-response.interface'
import { RequestHandler } from './request-handler'

export interface IHttpDriver<
  TRequest = IKondahRequest,
  TResponse = IKondahResponse,
  TDriver = IKondahDriver
> extends IBoot {
  addRoute(
    method: HttpMethod,
    path: string,
    handler: RequestHandler
  ): IHttpDriver<TRequest, TResponse, TDriver>

  addMiddleware(
    handler: RequestHandler
  ): IHttpDriver<TRequest, TResponse, TDriver>

  addMiddleware(
    path: string,
    handler: RequestHandler
  ): IHttpDriver<TRequest, TResponse, TDriver>

  sendJson<TData>(res: TResponse, data: TData): void

  run(port: number, message?: string): Promise<void>

  getServer(): Server

  addErrorHandler(): void

  setHttpStatusCode(req: TRequest, statusCode: HttpStatusCode): void
}
