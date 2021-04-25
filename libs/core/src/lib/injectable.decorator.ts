import 'reflect-metadata'
import { MetaTypes } from './metadata.types'

export function injectable() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any) {
    const injectables = Reflect.getMetadata('design:paramtypes', target)
    Reflect.set(target, MetaTypes.injectables, injectables)
  }
}
