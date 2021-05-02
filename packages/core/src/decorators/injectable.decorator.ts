import 'reflect-metadata'
import { MetaTypes } from '../metadata.types'

export function Injectable(): ClassDecorator {
  return function (target) {
    const injectables = Reflect.getMetadata('design:paramtypes', target) || []

    const currentInjectables =
      Reflect.getMetadata(MetaTypes.injectables, target.constructor) || []

    Reflect.set(target, MetaTypes.injectables, [
      ...currentInjectables,
      ...injectables,
    ])

    return
  }
}
