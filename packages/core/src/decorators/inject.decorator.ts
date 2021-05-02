import { MetaTypes } from '../metadata.types'
import { Token } from '../types'

export function Inject(identifier: Token) {
  return function (
    target: Record<string, unknown>,
    propertyKey: string,
    index: number
  ) {
    if (!Reflect.hasMetadata(MetaTypes.parameters, target)) {
      Reflect.defineMetadata(MetaTypes.parameters, [], target)
    }

    const currentInjectables = Reflect.getMetadata(MetaTypes.parameters, target)

    currentInjectables.push({ index, identifier })
  }
}
