import {
  Dumpster,
  IAppConfig,
  KondaContext,
  Plugin,
  RouteDefinition,
} from '@konda/core'

export class HttpControllerPlugin extends Plugin {
  public name = 'http-controller'

  static routes: Record<string, RouteDefinition[]> = {}

  protected setup<T>(
    context: KondaContext,
    config: IAppConfig['http-controller']
  ) {
    const app = context.server.getRawServer()

    Dumpster.controllers.forEach((controller) => {
      const resolvedDeps = this.hasInjectables(controller)
        ? controller.prototype.__injectables__.map((dep) => {
            return context.ioc.get(dep)
          })
        : []

      const instance = new controller(...resolvedDeps)
      const [prefix, routes] = this.getMetaData(controller)

      HttpControllerPlugin.routes[prefix] = routes

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

    if (config.serveRoutes) {
      this.serveRoutes(context)
    }

    return undefined
  }

  private serveRoutes(context: KondaContext) {
    const app = context.server.getRawServer()

    console.log(
      'view active routes at: http://localhost:5000/development/routes'
    )

    // @ts-expect-error adapter is not yet properly configured
    app.get('/development/routes', (req, res) => {
      res.json(
        Object.entries(HttpControllerPlugin.routes).map(([k, v]) => ({
          [k]: v.map((route) => `${route.requestMethod} -> ` + route.path),
        }))
      )
    })
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
