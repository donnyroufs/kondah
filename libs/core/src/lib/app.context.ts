import { ServerAdapter } from './server-adapter'
import { IOC } from './ioc'
import { PartialAppContext } from './types'

const implement = <T>() => class {} as new () => T

export class AppContext<
  T extends ServerAdapter = ServerAdapter
> extends implement<PartialAppContext>() {
  public readonly server: T
  public readonly ioc: IOC

  constructor(server: T, ioc: IOC) {
    super()
    this.server = server
    this.ioc = ioc
  }
}
