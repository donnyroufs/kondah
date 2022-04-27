import { Energizor, IEnergizor } from '@kondah/energizor'

import { KondahOptions } from './kondah-options'
import { Logger } from './logger'
import { IKondahLogger } from './types'
import { EnergizorLoggerAdapter } from './adapters/energizor-logger.adapter'
import { IHttpDriver } from './http/http-adapter.interface'
import { controllers } from './http/rest'

export abstract class Kondah<TRequest, TResponse, TDriver> {
  private readonly _energizor: Energizor
  private readonly _logger: IKondahLogger
  private readonly _httpDriver: IHttpDriver<TRequest, TResponse, TDriver>

  public constructor(opts: KondahOptions) {
    this._logger = opts.logger ?? new Logger()
    this._energizor =
      opts.energizor ?? new Energizor(new EnergizorLoggerAdapter(this._logger))
    this._httpDriver = new opts.httpDriver(this._energizor)
  }

  public abstract configureServices(services: IEnergizor): void
  public abstract setup(services: IEnergizor): Promise<void> | void

  protected getHttpDriver() {
    return this._httpDriver
  }

  public async boot() {
    this._energizor.addSingleton(Logger)

    this.configureServices(this._energizor)
    await this._httpDriver.onBoot()

    // TOOD: Abstract to a plugin which requires its own adapters
    // based on the http framework perhaps? That way we dont collide with Request and Response objects
    Object.entries(controllers).forEach(([k, v]) => {
      this._httpDriver.addRoute(
        v.method,
        this.normalizePath(v.target.__endpoint__, v.path),
        async (req, res, next) => {
          const params = createHandlerParams(
            v.handler.__params__ ?? [],
            req
          ).reverse()
          const result = await v.handler(...params)

          // NOTE: what if we bind the current request context
          // could we avoid passing the response object here?
          return this._httpDriver.sendJson(res, result)
        }
      )
    })

    await this._energizor.boot()
    await this.setup(this._energizor)

    this._logger.info('Successfuly booted.', 'KONDAH')
  }

  private normalizePath(controller: string, endpoint: string) {
    return controller + endpoint === '//' ? '/' : controller + endpoint
  }
}

function createHandlerParams(opts: any[], req: any) {
  return opts.map((opt) => {
    return req[opt.param]
  })
}
