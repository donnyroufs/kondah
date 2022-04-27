import { once } from 'events'
import express from 'express'
import { Server } from 'http'

import {
  HttpMethod,
  IHttpDriver,
  RequestHandler,
  Logger,
  AbstractHttpAdapter,
} from '@kondah/core'

export class ExpressHttpAdapter extends AbstractHttpAdapter<
  express.Request,
  express.Response,
  express.Application
> {
  public async onBoot(): Promise<void> {}

  private _server?: Server

  public sendJson<TData>(
    res: express.Response<any, Record<string, any>>,
    data: TData
  ): void {
    res.json(data)
  }

  public addRoute(
    method: HttpMethod,
    path: string,
    handler: RequestHandler<express.Request, express.Response>
  ): IHttpDriver<express.Request, express.Response, express.Application> {
    this._app[method](path, handler)

    return this
  }
  private readonly _app = express()

  public addMiddleware(
    handler: RequestHandler<express.Request, express.Response>
  ): IHttpDriver<express.Request, express.Response, express.Application>
  public addMiddleware(
    path: string,
    handler: RequestHandler<express.Request, express.Response>
  ): IHttpDriver<express.Request, express.Response, express.Application>
  public addMiddleware(
    pathOrHandler: any,
    handler?: RequestHandler<express.Request, express.Response>
  ): IHttpDriver<express.Request, express.Response, express.Application> {
    if (this.isHandlerDefined(handler)) {
      this._app.use(pathOrHandler, handler!)

      return this
    }

    this._app.use(pathOrHandler)

    return this
  }

  public async run(port: number, message?: string): Promise<void> {
    const logger = this.energizor.get(Logger)
    this._server = this._app.listen(port)
    await once(this._server, 'listening')
    logger.success(
      message ?? `Server is running on http://localhost:${port}`,
      'HTTP'
    )
  }

  public addErrorHandler(): void {
    this._app.use((err, req, res, next) => {
      const logger = this.energizor.get(Logger)

      logger.danger(err.message, 'HTTP')

      if (res.headersSent) {
        return next(err)
      }

      res.status(500).json({
        message: 'Server failed to handle your request.',
      })
    })
  }

  private isHandlerDefined(arg?: unknown) {
    return arg != null
  }
}
