import 'reflect-metadata'

import { Energizor, energizor } from './energizor'
import { AppContext } from './contexts'
import { PluginManager } from './plugin.manager'
import { IKondaOptions } from './types'
import { DependencyData } from './dependency-data'

export abstract class Kondah {
  private readonly _context: AppContext
  private readonly _pluginManager: PluginManager

  constructor(options: IKondaOptions) {
    this._context = new AppContext(options.server, energizor, options.logger)
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
    const data = new DependencyData<AppContext>(
      'singleton',
      // @ts-expect-error hacking away!
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
