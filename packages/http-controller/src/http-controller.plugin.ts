import { IAppConfig, AppContext, MetaTypes, KondahPlugin } from '@kondah/core'
import { HttpContextPlugin } from '@kondah/http-context'
import { Controller, MetadataStore } from './metadata.store'
import { RouteDefinition, IControllerOptions } from './types'

export class HttpControllerPlugin extends KondahPlugin<
  IAppConfig['http-controller']
> {
  public name = 'http-controller'
  public dependencies = [HttpContextPlugin]

  private _routes: Record<string, RouteDefinition[]> = {}

  protected async setup(context: AppContext) {
    MetadataStore.controllers.forEach((controller) => {
      const resolvedDeps = this.hasInjectables(controller)
        ? Reflect.get(controller, MetaTypes.injectables).map((dep) => {
            return context.energizor.get(dep)
          })
        : []

      const instance = new controller(...resolvedDeps) as any
      const [prefix, routes, middlewareOptions] = this.getMetaData(controller)

      this._routes[prefix] = routes

      routes.forEach((route) => {
        context.server.router[route.requestMethod](
          prefix + route.path,
          [
            ...route.middleware,
            ...(middlewareOptions &&
            this.shouldAddGlobalMiddleware(route.methodName, middlewareOptions)
              ? middlewareOptions.middleware
              : []),
          ],
          (req) => {
            const httpContext = req.kondah.httpContext
            instance[route.methodName](httpContext)
          }
        )
      })
    })

    if (this.config.serveRoutes) {
      this.serveRoutes(context)
    }

    return undefined
  }

  private shouldAddGlobalMiddleware(
    route: string,
    { only, except }: IControllerOptions
  ) {
    if (only && except) {
      throw new Error('cannot declare both only and except')
    }

    if (only) {
      return only.includes(route)
    }

    if (except) {
      return !except.includes(route)
    }

    return true
  }

  private serveRoutes(context: AppContext) {
    console.log(
      'view active routes at: http://localhost:5000/development/routes'
    )

    context.server.router.get('/development/routes', (req, res) => {
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
    const globalMiddleware = Reflect.getMetadata(
      'global:middleware',
      controller
    )

    const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller)

    return [prefix, routes, globalMiddleware]
  }
}
