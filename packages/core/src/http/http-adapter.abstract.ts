import { Server } from 'http'

import {
  IEnergizor,
  IKondahDriver,
  IKondahRequest,
  IKondahResponse,
  RequestHandler,
  HttpStatusCode,
  HttpMethod,
  HttpDriverException,
  IHttpDriver,
} from '../index'

export abstract class AbstractHttpAdapter
  implements IHttpDriver<IKondahRequest, IKondahResponse, IKondahDriver>
{
  protected server?: Server

  public constructor(protected readonly energizor: IEnergizor) {}

  public abstract addRoute(
    method: HttpMethod,
    path: string,
    handler: RequestHandler
  ): IHttpDriver<IKondahRequest, IKondahResponse, IKondahDriver>

  public abstract addMiddleware(
    handler: RequestHandler
  ): IHttpDriver<IKondahRequest, IKondahResponse, IKondahDriver>
  public abstract addMiddleware(
    path: string,
    handler: RequestHandler
  ): IHttpDriver<IKondahRequest, IKondahResponse, IKondahDriver>
  public abstract addMiddleware(
    path: any,
    handler?: any
  ): IHttpDriver<IKondahRequest, IKondahResponse, IKondahDriver>

  public abstract sendJson<TData>(res: IKondahResponse, data: TData): void

  public abstract run(port: number, message?: string): Promise<void>

  public getServer(): Server {
    if (!this.server) {
      throw new HttpDriverException('The http driver is not yet running.')
    }

    return this.server
  }

  public abstract onBoot(): void | Promise<void>
  public abstract addErrorHandler(): void
  public abstract setHttpStatusCode(
    req: IKondahRequest,
    statusCode: HttpStatusCode
  ): void
}
