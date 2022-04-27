import { Server } from 'http'
import { IEnergizor } from '..'

import { IHttpDriver } from './http-adapter.interface'
import { HttpDriverException } from './http-driver.exception'
import { HttpMethod } from './http-method.enum'
import { RequestHandler } from './request-handler'

export abstract class AbstractHttpAdapter<TRequest, TResponse, TDriver>
  implements IHttpDriver<TRequest, TResponse, TDriver>
{
  protected server?: Server

  public constructor(protected readonly energizor: IEnergizor) {}

  public abstract addRoute(
    method: HttpMethod,
    path: string,
    handler: RequestHandler<TRequest, TResponse>
  ): IHttpDriver<TRequest, TResponse, TDriver>

  public abstract addMiddleware(
    handler: RequestHandler<TRequest, TResponse>
  ): IHttpDriver<TRequest, TResponse, TDriver>
  public abstract addMiddleware(
    path: string,
    handler: RequestHandler<TRequest, TResponse>
  ): IHttpDriver<TRequest, TResponse, TDriver>
  public abstract addMiddleware(
    path: any,
    handler?: any
  ): IHttpDriver<TRequest, TResponse, TDriver>

  public abstract sendJson<TData>(res: TResponse, data: TData): void

  public abstract run(port: number, message?: string): Promise<void>

  public getServer(): Server {
    if (!this.server) {
      throw new HttpDriverException('The http driver is not yet running.')
    }

    return this.server
  }

  public abstract onBoot(): void | Promise<void>
}
