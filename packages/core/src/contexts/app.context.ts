import { ServerAdapter } from '../server-adapter'
import { Energizor } from '../energizor'
import { ILogger, PartialAppContext } from '../types'

const implement = <T>() => class {} as new () => T

export class AppContext<
  T extends ServerAdapter = ServerAdapter
> extends implement<PartialAppContext>() {
  public readonly server: T
  public readonly energizor: Energizor
  public readonly logger: ILogger

  constructor(server: T, energizor: Energizor, logger: ILogger) {
    super()
    this.server = server
    this.energizor = energizor
    this.logger = logger
  }
}
