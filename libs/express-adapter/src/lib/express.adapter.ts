import express, { RequestHandler } from 'express'
import { HttpVerb, ServerAdapter } from '@konda/core'

export class ExpressAdapter extends ServerAdapter {
  protected server = express()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public run(port: number, onSuccess?: () => void) {
    this.server.listen(port, () => this.onSuccessListen(port))
  }

  public use(path: string, fn: RequestHandler): void
  public use(fn: RequestHandler): void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public use(...args: any[]) {
    if (args.length === 1) {
      this.server.use(args[0])
      return
    }

    this.server.use(args[0], args[1])
  }

  public get(path: string, ...handlers: RequestHandler[]) {
    this.registerRoute('get', path, handlers)
  }

  public post(path: string, ...handlers: RequestHandler[]) {
    this.registerRoute('post', path, handlers)
  }

  public put(path: string, ...handlers: RequestHandler[]) {
    this.registerRoute('put', path, handlers)
  }

  public patch(path: string, ...handlers: RequestHandler[]) {
    this.registerRoute('patch', path, handlers)
  }

  public delete(path: string, ...handlers: RequestHandler[]) {
    this.registerRoute('delete', path, handlers)
  }

  public head(path: string, ...handlers: RequestHandler[]) {
    this.registerRoute('head', path, handlers)
  }

  public options(path: string, ...handlers: RequestHandler[]) {
    this.registerRoute('options', path, handlers)
  }

  private registerRoute(
    verb: HttpVerb,
    path: string,
    handlers: RequestHandler[]
  ) {
    this.server[verb](path, handlers)
  }
}
