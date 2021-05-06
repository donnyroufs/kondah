import 'reflect-metadata'

import { Energizor, energizor } from './energizor'
import { AppContext } from './contexts'
import { PluginManager } from './plugin.manager'
import { IKondaOptions } from './types'
import { DependencyData } from './dependency-data'
import { Logger } from './logger'
import { KondahServer } from './kondah-server'

export abstract class Kondah {
  private readonly _context: AppContext
  private readonly _pluginManager: PluginManager

  constructor(options: IKondaOptions) {
    const logger = options.logger || new Logger()
    this._context = new AppContext(new KondahServer(logger), energizor, logger)
    this._pluginManager = new PluginManager(options.plugins, options.config)

    this.initialize()
  }

  public getContext() {
    return this._context
  }

  protected abstract configureServices(services: Energizor): Promise<void>
  protected abstract setup(context: AppContext): Promise<void>

  protected async $beforeInstallPlugins(context: AppContext) {}

  private async initialize() {
    this.dirtyHacks()

    await this.configureServices(this._context.energizor)
    await this.$beforeInstallPlugins(this._context)
    await this._pluginManager.install(this._context)
    await this.setup(this._context)
  }

  private dirtyHacks() {
    this._context.server.use((req, res, next) => {
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
