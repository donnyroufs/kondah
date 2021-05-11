import {
  IAppConfig,
  AppContext,
  MetaTypes,
  KondahPlugin,
  AddToContext,
} from '@kondah/core'
import { HttpContextPlugin } from '@kondah/http-context'
import { Controller, MetadataStore } from './metadata.store'
import { RouteDefinition, IControllerOptions } from './types'

export class HttpControllerPlugin extends KondahPlugin<
  IAppConfig['http-controller']
> {
  public name = 'http-controller'
  public dependencies = [HttpContextPlugin]

  private _routes: Record<string, RouteDefinition[]> = {}

  protected async setup() {}

  // TODO: Add glob pattern
  @AddToContext()
  async addControllers() {
    for (const path of this.config.controllersPath) {
      await import(path)
    }

    this.registerControllers()
  }

  private registerControllers() {
    MetadataStore.controllers.forEach((controller) => {
      const resolvedDeps = this.hasInjectables(controller)
        ? Reflect.get(controller, MetaTypes.injectables).map((dep) => {
            return this.appContext.energizor.get(dep)
          })
        : []

      const instance = new controller(...resolvedDeps) as any
      const [prefix, routes, middlewareOptions] = this.getMetaData(controller)

      this._routes[prefix] = routes

      routes.forEach((route) => {
        this.appContext.server.router[route.requestMethod](
          prefix + route.path,
          [
            ...route.middleware,
            ...(middlewareOptions &&
            this.shouldAddGlobalMiddleware(route.methodName, middlewareOptions)
              ? middlewareOptions.middleware
              : []),
          ],
          async (req, res, next) => {
            if (this.config.catchExceptions) {
              try {
                const httpContext = req.kondah.httpContext
                return await instance[route.methodName](httpContext)
              } catch (err) {
                return next(err)
              }
            }

            const httpContext = req.kondah.httpContext
            instance[route.methodName](httpContext)
          }
        )
      })
    })
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
