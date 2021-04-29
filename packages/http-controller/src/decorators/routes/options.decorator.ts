import { addRouteMetadata } from '../../add-route-metadata'

export const Options = (path: string) => {
  return (target, propertyKey: string): void =>
    addRouteMetadata(target, propertyKey, path, 'options')
}
