import { addRouteMetadata } from '../../add-route-metadata'

export const Put = (path: string) => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'put')
}
