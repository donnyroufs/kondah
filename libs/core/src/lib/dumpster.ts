import { PropOrFunction } from './types'

export class Dumpster {
  static KondaContext = {}

  static addToKondaContext(key: string, propOrFn: PropOrFunction) {
    Dumpster.KondaContext[key] = propOrFn
  }
}
