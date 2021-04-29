import 'reflect-metadata'

export class MetadataStore {
  static controllers: any[] = []

  static addController(controller: any) {
    MetadataStore.controllers.push(controller)
  }
}
