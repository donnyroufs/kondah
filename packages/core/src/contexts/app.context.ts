import { ServerAdapter } from '../server-adapter'
import { Energizor } from '../energizor'
import { PartialAppContext } from '../types'

const implement = <T>() => class {} as new () => T

export class AppContext<
  T extends ServerAdapter = ServerAdapter
> extends implement<PartialAppContext>() {
  public readonly server: T
  public readonly energizor: Energizor

  constructor(server: T, energizor: Energizor) {
    super()
    this.server = server
    this.energizor = energizor
  }
}
