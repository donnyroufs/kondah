import 'reflect-metadata'

import { ServerAdapter } from './server-adapter'
import { IOC, ioc } from './ioc'
import { KondaContext } from './konda.context'
import { PluginManager } from './plugin.manager'
import { IKondaOptions } from './types'
import { ControllerHandler } from './controller.handler'

export abstract class Konda {
  protected readonly port: number = Number(process.env.PORT) || 5000

  private readonly _server: ServerAdapter
  private readonly _context: KondaContext
  private readonly _pluginManager: PluginManager
  private readonly _controllerHandler: ControllerHandler

  constructor(options: IKondaOptions) {
    this._server = options.server

    this._context = new KondaContext(options.server, ioc)
    this._controllerHandler = new ControllerHandler(this._context)
    this._pluginManager = new PluginManager(options.plugins, options.config)

    this.initialize()
  }

  public abstract configureServices(services: IOC): Promise<void>
  public abstract setup(context: KondaContext): Promise<void>

  public getContext() {
    return this._context
  }

  private async initialize() {
    await this.configureServices(this._context.ioc)
    await this._pluginManager.install(this._context)
    this._controllerHandler.setup()
    await this.setup(this._context)

    if (process.env.NODE_ENV !== 'test') {
      this._server.run(this.port)
    }
  }
}
