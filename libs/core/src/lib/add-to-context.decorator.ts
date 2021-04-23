import { Dumpster } from './dumpster'

/**
 *
 *
 * @param propName The identifier for the context, by default it uses the target key.
 *
 */
export function AddToContext(propName?: string) {
  return function (target: any, propertyKey: string) {
    const key = propName ? propName : propertyKey
    Dumpster.addToKondaContext(key, target[propertyKey])
  }
}
