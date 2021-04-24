import { Dumpster, KondaContext, Plugin, RouteDefinition } from '@konda/core'

export class HttpControllerPlugin extends Plugin {
  public name = 'http-controller'

  protected setup<T>(context: KondaContext) {
    const app = context.server.getRawServer()

    Dumpster.controllers.forEach((controller) => {
      const resolvedDeps = this.hasInjectables(controller)
        ? controller.prototype.__injectables__.map((dep) => {
            return context.ioc.get(dep)
          })
        : []

      const instance = new controller(...resolvedDeps)
      const [prefix, routes] = this.getMetaData(controller)

      routes.forEach((route) => {
        app[route.requestMethod](
          prefix + route.path,
          ...route.middleware,
          (request, response) => {
            instance[route.methodName](request, response)
          }
        )
      })
    })

    return undefined
  }

  private hasInjectables(controller: () => unknown) {
    return controller.prototype.__injectables__
  }

  private getMetaData(controller: () => unknown) {
    const prefix = Reflect.getMetadata('prefix', controller)

    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller)

    return [prefix, routes]
  }
}
