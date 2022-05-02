import { Energizor, IEnergizor } from '@kondah/energizor'

import { KondahOptions } from './kondah-options'
import { Logger } from './logger'
import { IKondahLogger } from './types'
import { EnergizorLoggerAdapter } from './adapters/energizor-logger.adapter'
import { IHttpDriver } from './http/http-adapter.interface'
import { asyncLocalStorage } from './http/async-local-storage'
import { REST, httpContextToken } from './http'

export abstract class Kondah<TRequest, TResponse, TDriver> {
  private readonly _energizor: Energizor
  private readonly _logger: IKondahLogger
  private readonly _httpDriver: IHttpDriver<TRequest, TResponse, TDriver>
  private readonly _rest: REST

  public constructor(opts: KondahOptions) {
    this._logger = opts.logger ?? new Logger()
    this._energizor =
      opts.energizor ?? new Energizor(new EnergizorLoggerAdapter(this._logger))
    this._httpDriver = new opts.httpDriver(this._energizor)
    this._rest = new REST(asyncLocalStorage, this._httpDriver, this._energizor)
  }

  public abstract configureServices(services: IEnergizor): void
  public abstract setup(services: IEnergizor): Promise<void> | void

  protected getHttpDriver() {
    return this._httpDriver
  }

  public async boot() {
    await this.preBoot()

    this.configureServices(this._energizor)

    await this._httpDriver.onBoot()

    await this._energizor.boot()
    await this.setup(this._energizor)
    this._rest.onBoot()

    this.getHttpDriver().addErrorHandler()

    this._logger.info('Successfuly booted.', 'KONDAH')
  }

  private async preBoot() {
    this._energizor.addSingleton(Logger)
    this._energizor.addFactory(httpContextToken, () =>
      asyncLocalStorage.getStore()
    )
  }
}
