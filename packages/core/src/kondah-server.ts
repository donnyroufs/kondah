import express = require('express')
import { ServerRouter } from './server.router'

import { ILogger, ServerRunFn, Middleware, ErrorMiddlewareFn } from './types'

export class KondahServer {
  public readonly router: ServerRouter

  private _server: express.Application
  private readonly _logger: ILogger
  private readonly _disableServer: boolean

  constructor(logger: ILogger, disableServer: boolean) {
    this.router = new ServerRouter(this)

    this._disableServer = disableServer
    this._server = express()
    this._logger = logger
  }

  public run(port: number, onSuccess?: () => void) {
    if (this._disableServer) return
    this._server.listen(port, () => this.onSuccessListen(port))
  }

  public addGlobalMiddleware(...middleware: Middleware[]) {
    this._server.use(middleware)
  }

  public addMiddleware(path: string, ...middleware: Middleware[]) {
    this._server.use(path, middleware)
  }

  public handleGlobalExceptions(handler: ErrorMiddlewareFn) {
    // @ts-ignore
    this._server.use(handler)
  }

  public set<T>(setting: string, val: T): void {
    this._server.set(setting, val)
  }

  public engine(
    ext: string,
    fn: (
      path: string,
      options: Record<string, unknown>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (e: any, rendered?: string | undefined) => void
    ) => void
  ) {
    // @ts-expect-error originally express uses object but we decided on using a Record type
    this._server.engine(ext, fn)
  }

  public overrideServerRun(callback: ServerRunFn) {
    this.run = callback
  }

  public getRawServer() {
    return this._server as express.Application
  }

  private onSuccessListen(port: number) {
    this._logger.info(`server is running on http://localhost:${port}`, 'SERVER')
  }
}
