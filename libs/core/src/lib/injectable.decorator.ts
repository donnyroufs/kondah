import 'reflect-metadata'
import { ioc } from './ioc'

export function injectable() {
  return function (target: any) {
    const injectables = Reflect.getMetadata('design:paramtypes', target)
    target.prototype.__injectables__ = injectables
  }
}
