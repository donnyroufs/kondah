import { IAppConfig, KondahPlugin, AddToContext } from '@kondah/core'
import { HttpContextPlugin } from '@kondah/http-context'
import { ControllerHandler } from './controller.handler'
import { MetadataStore } from './metadata.store'
import { MiddlewareHandler } from './middleware.handler'
import { RouteDefinition } from './types'

export class HttpControllerPlugin extends KondahPlugin<
  IAppConfig['http-controller']
> {
  public name = 'http-controller'
  public dependencies = [HttpContextPlugin]

  private _routes: Record<string, RouteDefinition[]> = {}
  private _controllerHandler!: ControllerHandler
  private _middlewareHandler!: MiddlewareHandler

  protected async setup() {
    this._controllerHandler = new ControllerHandler(
      this.appContext.energizor,
      this.config.catchExceptions
    )

    this._middlewareHandler = new MiddlewareHandler(
      this.appContext.energizor,
      this.config.catchExceptions
    )
  }

  // TODO: Add glob pattern
  @AddToContext()
  async addControllers(apiPrefix = '') {
    for (const path of this.config.controllersPath) {
      await import(path)
    }

    this.registerControllers(apiPrefix)
  }

  private registerControllers(apiPrefix: string) {
    MetadataStore.controllers.forEach((controller) => {
      const metadata = this._controllerHandler.getMetaData(controller)
      const instance =
        this._controllerHandler.createInstanceWithDeps(controller)

      this.registerRouteInformation(metadata.prefix, metadata.routes)

      metadata.routes.forEach((route) => {
        const endpoint = this.getSerializedEndpoint(
          apiPrefix + metadata.prefix + route.path
        )
        const globalMiddlewares =
          this._middlewareHandler.createGlobalMiddleware(
            metadata.options?.middleware,
            route.methodName,
            metadata.options
          )

        const routeMiddlewares = this._middlewareHandler.createRouteMiddleware(
          route.middleware
        )

        const routeHandler = this._controllerHandler.createRouteHandler(
          instance,
          route.methodName
        )

        this.appContext.server.router[route.requestMethod](
          endpoint,
          ...globalMiddlewares,
          ...routeMiddlewares,
          routeHandler
        )
      })
    })
  }

  // this._controllerHandler.createRouteHandler(instance, methodName)

  private registerRouteInformation(prefix: string, routes: RouteDefinition[]) {
    this._routes[prefix] = routes
  }

  private getSerializedEndpoint(endpoint: string) {
    return endpoint.replace(/\/\//g, '/')
  }
}
