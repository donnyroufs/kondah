import express = require('express')

import { ILogger, HttpVerb, ServerRunFn, Middleware } from './types'

export class KondahServer {
  private _server: express.Application
  private readonly _logger: ILogger

  constructor(logger: ILogger) {
    this._server = express()
    this._logger = logger
  }

  public run(port: number, onSuccess?: () => void) {
    this._server.listen(port, () => this.onSuccessListen(port))
  }

  public addGlobalMiddleware(...middleware: Middleware[]) {
    this._server.use(middleware)
  }

  public addMiddleware(path: string, ...middleware: Middleware[]) {
    this._server.use(path, middleware)
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

  public get(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('get', path, handlers)
  }

  public post(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('post', path, handlers)
  }

  public put(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('put', path, handlers)
  }

  public patch(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('patch', path, handlers)
  }

  public delete(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('delete', path, handlers)
  }

  public head(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('head', path, handlers)
  }

  public options(path: string, ...handlers: express.RequestHandler[]) {
    this.registerRoute('options', path, handlers)
  }

  public getRawServer() {
    return this._server as express.Application
  }

  public overrideServerRun(callback: ServerRunFn) {
    this.run = callback
  }

  private registerRoute(
    verb: HttpVerb,
    path: string,
    handlers: express.RequestHandler[]
  ) {
    this._server[verb](path, handlers)
  }

  private onSuccessListen(port: number) {
    this._logger.info(`server is running on http://localhost:${port}`, 'SERVER')
  }
}
