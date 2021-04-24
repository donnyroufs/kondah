import { addRouteMetadata } from '../../add-route-metadata'

export const Patch = (path: string): MethodDecorator => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'patch')
}
