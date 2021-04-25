import 'reflect-metadata'
import { Dumpster, MetaTypes } from '@konda/core'

export const Controller = (prefix = ''): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target)

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }

    const injectables = Reflect.getMetadata('design:paramtypes', target)
    Reflect.set(target, MetaTypes.injectables, injectables)

    Dumpster.addController(target)
  }
}
