import 'reflect-metadata'
import { ServerAdapter } from './server-adapter'

import { IOC, ioc } from './ioc'
import { KondaContext } from './konda.context'
import { PluginManager } from './plugin.manager'
import { IKondaOptions, RouteDefinition } from './types'
import { Dumpster } from './dumpster'

export abstract class Konda {
  protected readonly port: number = Number(process.env.PORT) || 5000

  private readonly _server: ServerAdapter
  private readonly _context: KondaContext
  private readonly _pluginManager: PluginManager

  constructor(options: IKondaOptions) {
    this._server = options.server

    this._context = new KondaContext(options.server, ioc)
    this._pluginManager = new PluginManager(options.plugins)

    this.initialize()
  }

  public abstract configureServices(services: IOC): Promise<void>
  public abstract setup(context: KondaContext): Promise<void>

  private async initialize() {
    await this.configureServices(this._context.ioc)
    await this._pluginManager.install(this._context)
    this.registerHttpRoutes()
    console.log(Dumpster.controllers)
    await this.setup(this._context)

    if (process.env.NODE_ENV !== 'test') {
      this._server.run(this.port)
    }
  }

  public getContext() {
    return this._context
  }

  private registerHttpRoutes() {
    const app = this._context.server.getRawServer()

    Dumpster.controllers.forEach((controller) => {
      const instance = new controller()
      // The prefix saved to our controller
      const prefix = Reflect.getMetadata('prefix', controller)
      // Our `routes` array containing all our routes for this controller
      const routes: Array<RouteDefinition> = Reflect.getMetadata(
        'routes',
        controller
      )

      // Iterate over all routes and register them to our express application
      routes.forEach((route) => {
        // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
        // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
        // this should be enough for now.
        app[route.requestMethod](prefix + route.path, (request, response) => {
          // TODO: pass custom context
          instance[route.methodName]({ request, response })
        })
      })
    })
  }
}
