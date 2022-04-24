import { Energizor, IEnergizor } from '@kondah/energizor'

import { KondahOptions } from './kondah-options'
import { Logger } from './logger'
import { IKondahLogger } from './types'
import { EnergizorLoggerAdapter } from './adapters/energizor-logger.adapter'
import { IHttpDriver } from './http/http-adapter.interface'
import { controllers } from './http/rest'
import { IResponse } from './http/request-handler'

export abstract class Kondah<TRequest, TResponse extends IResponse, TDriver> {
  private readonly _energizor: Energizor
  private readonly _logger: IKondahLogger
  private readonly _httpDriver: IHttpDriver<TRequest, TResponse, TDriver>

  public constructor(opts: KondahOptions) {
    this._httpDriver = opts.httpDriver
    this._logger = opts.logger ?? new Logger()
    this._energizor = new Energizor(new EnergizorLoggerAdapter(this._logger))
  }

  public abstract configureServices(services: IEnergizor): void
  public abstract setup(services: IEnergizor): Promise<void> | void

  protected getHttpDriver() {
    return this._httpDriver
  }

  public async boot() {
    this._energizor.addSingleton(Logger)

    this.configureServices(this._energizor)

    // TOOD: Abstract
    Object.entries(controllers).forEach(([k, v]) => {
      this._httpDriver.addRoute(
        v.method,
        v.target.__endpoint__ + v.path,
        async (req, res, next) => {
          const params = createHandlerParams(
            v.handler.__params__,
            req
          ).reverse()
          const result = await v.handler(...params)

          return res.json(result)
        }
      )
    })

    await this._energizor.boot()
    await this.setup(this._energizor)

    this._logger.info('Successfuly booted.', 'KONDAH')
  }
}

function createHandlerParams(opts: any[], req: any) {
  return opts.map((opt) => {
    return req[opt.param]
  })
}
