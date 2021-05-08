import express = require('express')
import { KondahServer } from './kondah-server'
import { HttpVerb } from './types'

export class ServerRouter {
  constructor(private readonly _server: KondahServer) {}

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

  private registerRoute(
    verb: HttpVerb,
    path: string,
    handlers: express.RequestHandler[]
  ) {
    const app = this._server.getRawServer()
    app[verb](path, ...handlers)
  }
}
