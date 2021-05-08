import 'reflect-metadata'
import { MetaTypes, Utils } from '@kondah/core'
import { MetadataStore } from '../metadata.store'
import { IControllerOptions } from '../types'

export const Controller = (
  prefix = '/',
  options?: IControllerOptions
): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)

    if (options) {
      if (options.only && options.except) {
        throw new Error('You cannot have both only and except defined')
      }

      Reflect.defineMetadata('global:middleware', options, target)
    }

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
