import { MetaTypes } from './metadata.types'

export function AddToContext(): MethodDecorator {
  return function (target, propertyKey) {
    if (!Reflect.hasMetadata(MetaTypes.extensions, target.constructor)) {
      Reflect.defineMetadata(MetaTypes.extensions, [], target.constructor)
    }

    const currentExtensions = Reflect.getMetadata(
      MetaTypes.extensions,
      target.constructor
    )

    currentExtensions.push(propertyKey)

    Reflect.defineMetadata(
      MetaTypes.extensions,
      currentExtensions,
      target.constructor
    )
  }
}
