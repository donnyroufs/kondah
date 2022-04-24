import { HttpMethod, IHttpDriver, RequestHandler } from '@kondah/core'
import { once } from 'events'

import * as express from 'express'

export class ExpressHttpAdapter
  implements
    IHttpDriver<express.Request, express.Response, express.Application>
{
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

  // TODO: Need access to energizor
  public async run(port: number, message?: string): Promise<void> {
    const server = this._app.listen(port, () =>
      console.log(message ?? `Server is running on http://localhost:${port}`)
    )
    await once(server, 'listening')
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private isHandlerDefined(arg?: any) {
    return arg != null
  }
}
