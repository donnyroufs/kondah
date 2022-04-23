import { Energizor, IEnergizor } from '@kondah/energizor'

import { EnergizorLoggerAdapter, Logger } from './logger'
import { KondahPlatform } from './platform'
import { IKondahLogger } from './types'

class KondahOpts<T extends KondahPlatform> {
  public constructor(
    public readonly platform: T,
    public readonly logger?: IKondahLogger
  ) {}
}

export abstract class Kondah<T extends KondahPlatform> {
  private readonly _energizor: Energizor
  private readonly _logger: IKondahLogger
  protected readonly platform: T

  public constructor(opts: KondahOpts<T>) {
    this._logger = opts.logger ?? new Logger()
    this.platform = opts.platform
    this._energizor = new Energizor(new EnergizorLoggerAdapter(this._logger))
  }

  public abstract configureServices(services: IEnergizor): void
  public abstract setup(services: IEnergizor): Promise<void> | void

  public async boot() {
    this.setupDependencies()

    await this._energizor.boot()

    this.bindEnergizorToPlatform()
    await this.platform.installPlugins()
    await this.platform.boot()

    await this.setup(this._energizor)

    this._logger.info('Successfuly booted.', 'KONDAH')
  }

  private bindEnergizorToPlatform() {
    this.platform.energizor = this._energizor
  }

  private setupDependencies() {
    this._energizor.addSingleton(Logger)
    this.configureServices(this._energizor)
  }
}
