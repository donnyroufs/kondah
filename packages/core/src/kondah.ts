import { Energizor, IEnergizor } from '@kondah/energizor'
import { Logger } from './logger'
import { TestableKondah } from './testable-kondah'
import { IKondahLogger } from './types'

export abstract class Kondah {
  private readonly _energizor: IEnergizor
  private readonly _logger: IKondahLogger

  public constructor(logger?: IKondahLogger) {
    this._logger = logger || new Logger()
    this._energizor = new Energizor(this._logger)
  }

  protected abstract configureServices(energizor: IEnergizor): void
  protected abstract setup(energizor: IEnergizor): Promise<void> | void

  public async boot() {
    this.configureServices(this._energizor)

    await this._energizor.boot()
    await this.setup(this._energizor)

    this._logger.info('Kondah is up and running.')
  }

  // TODO: Implement
  public static createTestableKondah(): TestableKondah {
    return new TestableKondah()
  }
}
