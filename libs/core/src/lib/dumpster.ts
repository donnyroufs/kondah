import { PropOrFunction } from './types'

// TODO: Refactor to use metadata instead
// with as end result deleting Dumpster
export class Dumpster {
  static KondaContext = {}

  static addToKondaContext(key: string, propOrFn: PropOrFunction) {
    Dumpster.KondaContext[key] = propOrFn
  }
}
