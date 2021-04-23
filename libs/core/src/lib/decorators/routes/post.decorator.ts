import { addRouteMetadata } from '../../add-route-metadata'

export const Post = (path: string): MethodDecorator => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'post')
}
