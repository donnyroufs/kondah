import {
  IAppConfig,
  AppContext,
  MetaTypes,
  Plugin,
  RouteDefinition,
} from '@konda/core'
import { Controller, MetadataStore } from './metadata.store'

export class HttpControllerPlugin extends Plugin {
  public name = 'http-controller'

  // TODO: Remove
  static routes: Record<string, RouteDefinition[]> = {}

  protected setup<T>(
    context: AppContext,
    config: IAppConfig['http-controller']
  ) {
    const app = context.server.getRawServer()

    MetadataStore.controllers.forEach((controller) => {
      const resolvedDeps = this.hasInjectables(controller)
        ? Reflect.get(controller, MetaTypes.injectables).map((dep) => {
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

  private serveRoutes(context: AppContext) {
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

  private hasInjectables(controller: Controller) {
    return Reflect.get(controller, MetaTypes.injectables)
  }

  private getMetaData(controller: Controller) {
    const prefix = Reflect.getMetadata('prefix', controller)

    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller)

    return [prefix, routes]
  }
}