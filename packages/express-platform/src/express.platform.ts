import { KondahPlatform, Logger, KondahPlatformOpts } from '@kondah/core'

import * as express from 'express'
import { once } from 'events'
import { Server } from 'http'

export class ExpressPlatformOpts extends KondahPlatformOpts<{
  middleware: express.RequestHandler[]
}> {}

export class ExpressPlatform extends KondahPlatform {
  private _server?: Server
  private readonly _app = express()

  public getExpressApp() {
    return this._app
  }

  public getHttpServer() {
    if (!this._server) {
      throw new Error(
        "Server has not been started yet therefore there's no available http server."
      )
    }

    return this._server
  }

  public async run(
    port: number,
    message = `Server is up and running on http://localhost:${port}`
  ) {
    const logger = this.energizor.get(Logger)

    this._server = this._app.listen(port)

    await once(this._server, 'listening')
    logger.info(message, 'PLATFORM')
  }

  public async boot(): Promise<void> {}
}
