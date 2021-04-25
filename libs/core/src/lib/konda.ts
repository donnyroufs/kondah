import 'reflect-metadata'

import { ServerAdapter } from './server-adapter'
import { IOC, ioc } from './ioc'
import { AppContext } from './konda.context'
import { PluginManager } from './plugin.manager'
import { IKondaOptions } from './types'
import { DependencyData } from './dependency-data'

export abstract class Konda {
  protected readonly port: number = Number(process.env.PORT) || 5000

  private readonly _server: ServerAdapter
  private readonly _context: AppContext
  private readonly _pluginManager: PluginManager

  constructor(options: IKondaOptions) {
    this._server = options.server

    this._context = new AppContext(options.server, ioc)
    this._pluginManager = new PluginManager(options.plugins, options.config)

    this.initialize()
  }

  public getContext() {
    return this._context
  }

  protected abstract configureServices(services: IOC): Promise<void>
  protected abstract setup(context: AppContext): Promise<void>

  private async initialize() {
    this.dirtyAddContextToIoc()
    await this.configureServices(this._context.ioc)
    await this._pluginManager.install(this._context)
    await this.setup(this._context)

    if (process.env.NODE_ENV !== 'test') {
      this._server.run(this.port)
    }
  }

  private dirtyAddContextToIoc() {
    const data = new DependencyData('singleton', AppContext, [], this._context)
    // @ts-expect-error dirty hack to add the current context to the IOC container
    this._context.ioc._dependencies.set(AppContext.name, data)
  }
}
