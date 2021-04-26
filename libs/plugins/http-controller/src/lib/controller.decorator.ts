import 'reflect-metadata'
import { MetaTypes } from '@kondah/core'
import { MetadataStore } from './metadata.store'

export const Controller = (prefix = ''): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }

    const injectables = Reflect.getMetadata('design:paramtypes', target)

    // TODO: should become internal and replaced with something like
    // decorate(injectable(target)) which is exposed from @kondah/core
    Reflect.set(target, MetaTypes.injectables, injectables)

    const controllers = MetadataStore.controllers
    controllers.push(target)
  }
}
