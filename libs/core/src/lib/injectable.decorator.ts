import 'reflect-metadata'
import { ioc } from './ioc'

export function injectable(target: any) {
  const injectables = Reflect.getMetadata('design:paramtypes', target)
  target.prototype.__injectables__ = injectables
}
