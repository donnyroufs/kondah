import { MetaTypes } from './metadata.types'
import { Dependency } from './types'

export class Utils {
  static replaceInterfacesWithToken<T>(injectables: any[], dep: Dependency<T>) {
    const parameters = Reflect.getMetadata(MetaTypes.parameters, dep)

    return injectables.map((injectable, index) => {
      const isInterface = injectable.toString().includes('Object()')

      const _token = isInterface
        ? parameters.find((parameter) => parameter.index === index).identifier
        : null

      return isInterface ? _token : injectable
    })
  }
}
