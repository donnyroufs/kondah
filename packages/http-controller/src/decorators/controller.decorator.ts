import 'reflect-metadata'
import { MetaTypes, Utils } from '@kondah/core'
import { MetadataStore } from '../metadata.store'

export const Controller = (prefix = ''): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }

    const injectables = Reflect.getMetadata('design:paramtypes', target) || []
    const normalizedInjectables = Utils.replaceInterfacesWithToken(
      injectables,
      target
    )

    Reflect.set(target, MetaTypes.injectables, normalizedInjectables)

    const controllers = MetadataStore.controllers

    controllers.push(target)
  }
}
