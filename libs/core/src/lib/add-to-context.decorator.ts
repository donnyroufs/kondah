import { MetadataStore } from './metadata.store'

/**
 * @param propName The identifier for the context, by default it uses the target key.
 */
export function AddToContext(propName?: string): MethodDecorator {
  return function (target, propertyKey) {
    const key = propName ? propName : propertyKey
    MetadataStore.addToAppContext(key, target[key].bind(target[key]))
  }
}
