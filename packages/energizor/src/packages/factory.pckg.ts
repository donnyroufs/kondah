import { Registry } from '../registry'
import { AbstractPckg } from './abstract-pckg'

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  )
}

export class FactoryPckg extends AbstractPckg {
  public getValue(registry: Registry) {
    const dependency = this.getDependency()

    if (isFunction(dependency.getConstructor())) {
      // @ts-ignore
      return dependency.getConstructor()()
    }

    return dependency.getConstructor()
  }
}
