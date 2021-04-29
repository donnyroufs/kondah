import { addRouteMetadata } from '../../add-route-metadata'

export const Post = (path: string) => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'post')
}
