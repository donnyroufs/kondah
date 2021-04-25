import { RouteDefinition } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Middleware(...middleware: any[]): MethodDecorator {
  return function (target, propertyKey) {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata(
      'routes',
      target.constructor
    ) as RouteDefinition[]

    const route = routes.find((route) => route.methodName === propertyKey)

    if (route) {
      route.middleware = middleware
    }

    if (!route) {
      // @ts-expect-error this prevents issues with the order of decorators
      routes.push({ middleware, methodName: propertyKey })
    }

    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}
