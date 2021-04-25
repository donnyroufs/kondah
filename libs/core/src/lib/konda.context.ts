import { ServerAdapter } from './server-adapter'
import { IOC } from './ioc'
import { PartialAppContext } from './types'

const implement = <T>() => class {} as new () => T

export class AppContext extends implement<PartialAppContext>() {
  public readonly server: Omit<ServerAdapter, 'run'>
  public readonly ioc: IOC

  constructor(server: ServerAdapter, ioc: IOC) {
    super()
    this.server = server
    this.ioc = ioc
  }
}
