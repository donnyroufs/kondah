import 'reflect-metadata'
import { PropOrFunction } from './types'

export class MetadataStore {
  static AppContext = {}
  static controllers = []

  static addToAppContext(key: string, propOrFn: PropOrFunction) {
    MetadataStore.AppContext[key] = propOrFn
  }

  static addController(controller: unknown) {
    MetadataStore.controllers.push(controller)
  }
}
