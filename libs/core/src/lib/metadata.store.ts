import 'reflect-metadata'

export class MetadataStore {
  static controllers = []

  static addController(controller: unknown) {
    MetadataStore.controllers.push(controller)
  }
}
