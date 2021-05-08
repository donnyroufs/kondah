import 'reflect-metadata'

import { Energizor, energizor } from './energizor'
import { AppContext } from './contexts'
import { PluginHandler } from './plugin.handler'
import { IKondaOptions } from './types'
import { DependencyData } from './dependency-data'
import { Logger } from './logger'
import { KondahServer } from './kondah-server'

export abstract class Kondah {
  private readonly _context: AppContext
  private readonly _pluginHandler: PluginHandler

  constructor(options: IKondaOptions) {
    const logger = options.logger || new Logger()
    this._context = new AppContext(new KondahServer(logger), energizor, logger)
    this._pluginHandler = new PluginHandler(
      options.plugins,
      options.config,
      this._context
    )

    this.initialize()
  }

  public getContext() {
    return this._context
  }

  protected abstract configureServices(services: Energizor): Promise<void>
  protected abstract setup(context: AppContext): Promise<void>

  // TODO: Implement with auto generated hooks
  protected async $beforeInstallPlugins(context: AppContext) {}
  protected async $afterInstallPlugins(context: AppContext) {}
  protected async $afterSetupKondah(context: AppContext) {}

  private async initialize() {
    this.dirtyHacks()

    await this.configureServices(this._context.energizor)
    await this.$beforeInstallPlugins(this._context)
    await this._pluginHandler.install(this._context)
    await this.$afterInstallPlugins(this._context)
    await this.setup(this._context)
    await this.$afterSetupKondah(this._context)
  }

  private dirtyHacks() {
    this._context.server.addGlobalMiddleware((req, res, next) => {
      // @ts-expect-error because we don't type this
      if (!req.kondah) {
        // @ts-expect-error because we don't type this
        req.kondah = {}
      }

      next()
    })

    const data = new DependencyData(
      'singleton',
      AppContext.name,
      AppContext,
      [],
      this._context
    )
    // @ts-expect-error dirty hack to add the current context to the Energizor container
    this._context.energizor._dependencies.set(AppContext.name, data)

    // @ts-expect-error dirty hack to give energizor access to the current context
    energizor._appContext = this._context
  }
}
