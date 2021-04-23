import { ServerAdapter } from './server-adapter'
import { IOC } from './ioc'
import { IKondaContext } from './types'

// Small hack to extend a interface rather than implementing
// because plugins can augment the `IKodaContext` interface
// making `KodaContext` invalid since it does not implement
// the augmented interface
type PartialKodaContext = Partial<IKondaContext>

const implement = <T>() => class {} as new () => T

export class KondaContext extends implement<PartialKodaContext>() {
  public readonly server: Omit<ServerAdapter, 'run'>
  public readonly ioc: IOC

  constructor(server: ServerAdapter, ioc: IOC) {
    super()
    this.server = server
    this.ioc = ioc
  }
}
