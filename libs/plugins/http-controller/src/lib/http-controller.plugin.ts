import { IAppConfig, AppContext, MetaTypes, Plugin } from '@kondah/core'
import { Controller, MetadataStore } from './metadata.store'
import { RouteDefinition } from './types'

export class HttpControllerPlugin extends Plugin<
  IAppConfig['http-controller']
> {
  public name = 'http-controller'

  private _routes: Record<string, RouteDefinition[]> = {}

  protected setup(context: AppContext) {
    const app = context.server.getRawServer()

    MetadataStore.controllers.forEach((controller) => {
      const resolvedDeps = this.hasInjectables(controller)
        ? Reflect.get(controller, MetaTypes.injectables).map((dep) => {
            return context.energizor.get(dep)
          })
        : []

      const instance = new controller(...resolvedDeps)
      const [prefix, routes] = this.getMetaData(controller)

      this._routes[prefix] = routes

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

    if (this.config.serveRoutes) {
      this.serveRoutes(context)
    }

    return undefined
  }

  private serveRoutes(context: AppContext) {
    console.log(
      'view active routes at: http://localhost:5000/development/routes'
    )

    context.server.get('/development/routes', (req, res) => {
      res.json(
        Object.entries(this._routes).map(([k, v]) => ({
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
