import { Dumpster } from './dumpster'
import { KondaContext } from './konda.context'
import { RouteDefinition } from './types'

export class ControllerHandler {
  constructor(private readonly _context: KondaContext) {}

  public setup() {
    const app = this._context.server.getRawServer()

    Dumpster.controllers.forEach((controller) => {
      const resolvedDeps = this.hasInjectables(controller)
        ? controller.prototype.__injectables__.map((dep) => {
            return this._context.ioc.get(dep)
          })
        : []

      const instance = new controller(...resolvedDeps)

      const [prefix, routes] = this.getMetaData(controller)

      routes.forEach((route) => {
        app[route.requestMethod](prefix + route.path, (request, response) => {
          // TODO: pass custom context
          instance[route.methodName]({ request, response })
        })
      })
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
