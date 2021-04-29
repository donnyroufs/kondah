import { addRouteMetadata } from '../../add-route-metadata'

export const Head = (path: string) => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'head')
}
