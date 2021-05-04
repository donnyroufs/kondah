import { Energizor } from '../energizor'
import { PartialAppContext, ILogger } from '../types'
import { KondahServer } from '../kondah-server'

const implement = <T>() => class {} as new () => T

export class AppContext extends implement<PartialAppContext>() {
  public readonly server: KondahServer
  public readonly energizor: Energizor
  public readonly logger: ILogger

  constructor(server: KondahServer, energizor: Energizor, logger: ILogger) {
    super()
    this.server = server
    this.logger = logger
    this.energizor = energizor
  }
}
