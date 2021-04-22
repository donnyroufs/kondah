import { ServerAdapter } from './server-adapter'
import { IOC } from './ioc'
import { IKondaContext } from './types'

export class KondaContext implements IKondaContext {
  public readonly server: Omit<ServerAdapter, 'run'>
  public readonly ioc: IOC

  constructor(server: ServerAdapter, ioc: IOC) {
    this.server = server
    this.ioc = ioc
  }

  add(name: string, propOrFunction: any) {
    this[name] = propOrFunction
  }
}
