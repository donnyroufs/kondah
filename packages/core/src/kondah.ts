import { Energizor, IEnergizor } from '@kondah/energizor'

import { KondahOptions } from './kondah-options'
import { Logger } from './logger'
import { IKondahLogger } from './types'
import { EnergizorLoggerAdapter } from './adapters/energizor-logger.adapter'
import { IHttpDriver } from './http/http-adapter.interface'
import { controllers } from './http/rest'
import { asyncLocalStorage } from './http/async-local-storage'
import { httpContextToken } from './http'

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
    this._energizor.addFactory(httpContextToken, () =>
      asyncLocalStorage.getStore()
    )

    this.configureServices(this._energizor)
    await this._httpDriver.onBoot()

    await this._energizor.boot()
    await this.setup(this._energizor)

    // TODO: Abstract, add tests, and refactor.
    controllers.forEach((v) => {
      this._httpDriver.addRoute(
        v.method,
        this.normalizePath(v.target.__endpoint__, v.path),
        asyncRequestHandler(async (req, res) => {
          asyncLocalStorage.run({ req, res }, async () => {
            const instance = this._energizor.get(v.constr!)

            const params = createHandlerParams(
              v.handler.__params__ ?? [],
              req
            ).reverse()

            const result = await instance[v.handler.name](...params)

            // NOTE: what if we bind the current request context
            // could we avoid passing the response object here?

            // TODO: Refactor with adapter, this only works for Express
            res.statusCode = v.statusCode

            return this._httpDriver.sendJson(res, result)
          })
        })
      )
    })

    this.getHttpDriver().addErrorHandler()

    this._logger.info('Successfuly booted.', 'KONDAH')
  }

  private normalizePath(controller: string, endpoint: string) {
    const path = controller + endpoint

    if (path.includes('//')) {
      return path.replace('//', '/')
    }

    if (path.slice(-1) === '/') return path.substring(0, path.length - 1)

    return path
  }
}

function createHandlerParams(opts: any[], req: any) {
  return opts.map((opt) => {
    const param = req[opt.param]

    if (opt.callback) return opt.callback(param)

    return param
  })
}

function asyncRequestHandler(cb: any) {
  return async (req, res, next) => {
    try {
      return await cb(req, res)
    } catch (err) {
      next(err)
    }
  }
}
