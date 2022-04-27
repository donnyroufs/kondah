import { MetadataKey } from './metadata.enum'
import { Constructor } from './types'

export class Utils {
  public static isConstructor(token: any): token is Constructor {
    return typeof token === 'function' && token.prototype
  }

  public static mergeAndSetMetadata(
    key: MetadataKey,
    target: any,
    data: any[]
  ) {
    const currentData = Reflect.getMetadata(key, target) || []
    const merged = [...currentData, ...data]

    Reflect.set(target, key, merged)
  }

  public static getMetadata<T>(key: MetadataKey, target: any): T[] {
    const data = Reflect.get(target, key)

    if (!data) {
      return []
    }

    return data
  }

  public static constructify<T>(target: T) {
    return class {
      constructor() {
        Object.assign(this, target)
      }
    } as Constructor<T>
  }
}
