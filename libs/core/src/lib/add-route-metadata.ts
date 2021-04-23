import { HttpVerb, RouteDefinition } from './types'

export function addRouteMetadata(
  target,
  propertyKey: string,
  path: string,
  method: HttpVerb
) {
  if (!Reflect.hasMetadata('routes', target.constructor)) {
    Reflect.defineMetadata('routes', [], target.constructor)
  }

  const routes = Reflect.getMetadata(
    'routes',
    target.constructor
  ) as RouteDefinition[]

  routes.push({
    requestMethod: method,
    path,
    methodName: propertyKey,
  })

  Reflect.defineMetadata('routes', routes, target.constructor)
}
