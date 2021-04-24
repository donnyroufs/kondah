import { HttpVerb, RouteDefinition } from '@konda/core'

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

  const route = routes.find((route) => route.methodName === propertyKey)

  if (!route) {
    routes.push({
      requestMethod: method,
      path,
      methodName: propertyKey,
      middleware: [],
    })
  }

  if (route) {
    route.path = path
    route.requestMethod = method
  }

  Reflect.defineMetadata('routes', routes, target.constructor)
}
