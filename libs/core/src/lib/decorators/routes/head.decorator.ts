import { addRouteMetadata } from '../../add-route-metadata'

export const Head = (path: string): MethodDecorator => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'head')
}
