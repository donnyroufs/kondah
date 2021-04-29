import { addRouteMetadata } from '../../add-route-metadata'

export const Delete = (path: string) => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'delete')
}
