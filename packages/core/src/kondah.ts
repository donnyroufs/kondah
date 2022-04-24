import { Energizor, IEnergizor } from '@kondah/energizor'

import { IHttpDriver } from './http/http-adapter.interface'
import { KondahOptions } from './kondah-options'
import { EnergizorLoggerAdapter, Logger } from './logger'
import { IKondahLogger } from './types'

export abstract class Kondah {
  private readonly _energizor: Energizor
  private readonly _logger: IKondahLogger
  private readonly _httpDriver: IHttpDriver

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

    await this._energizor.boot()
    await this.setup(this._energizor)

    this._logger.info('Successfuly booted.', 'KONDAH')
  }
}
