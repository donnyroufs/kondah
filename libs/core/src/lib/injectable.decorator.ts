import 'reflect-metadata'
import { MetaTypes } from './metadata.types'

export function Injectable(): ClassDecorator {
  return function (target) {
    const injectables = Reflect.getMetadata('design:paramtypes', target)
    Reflect.set(target, MetaTypes.injectables, injectables)
    return
  }
}
