import { addRouteMetadata } from '../../add-route-metadata'

export const Delete = (path: string): MethodDecorator => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'delete')
}
