import { addRouteMetadata } from '../../add-route-metadata'

export const Get = (path: string): MethodDecorator => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'get')
}
