import 'reflect-metadata'
import { PropOrFunction } from './types'

export class MetadataStore {
  static KondaContext = {}
  static controllers = []

  static addToKondaContext(key: string, propOrFn: PropOrFunction) {
    MetadataStore.KondaContext[key] = propOrFn
  }

  static addController(controller: unknown) {
    MetadataStore.controllers.push(controller)
  }
}
