import 'reflect-metadata'

import { ServerAdapter } from './server-adapter'
import { Energizor, energizor } from './energizor'
import { AppContext } from './app.context'
import { PluginManager } from './plugin.manager'
import { IKondaOptions } from './types'
import { DependencyData } from './dependency-data'

export abstract class Konda {
  private readonly _server: ServerAdapter
  private readonly _context: AppContext
  private readonly _pluginManager: PluginManager

  constructor(options: IKondaOptions) {
    this._server = options.server

    this._context = new AppContext(options.server, energizor)
    this._pluginManager = new PluginManager(options.plugins, options.config)

    this.initialize()
  }

  public getContext() {
    return this._context
  }

  protected abstract configureServices(services: Energizor): Promise<void>
  protected abstract setup(context: AppContext): Promise<void>

  private async initialize() {
    this.dirtyAddContextToIoc()

    await this.configureServices(this._context.energizor)
    await this._pluginManager.install(this._context)
    await this.setup(this._context)
  }

  private dirtyAddContextToIoc() {
    const data = new DependencyData('singleton', AppContext, [], this._context)
    // @ts-expect-error dirty hack to add the current context to the Energizor container
    this._context.energizor._dependencies.set(AppContext.name, data)
  }
}
