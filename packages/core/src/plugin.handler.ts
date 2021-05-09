import { KondahPlugin } from './kondah-plugin'
import { AppContext } from './contexts'
import { IAppConfig, NewablePlugin } from './types'
import { MetaTypes } from './metadata.types'

export class PluginHandler {
  private readonly _plugins: KondahPlugin[] = []
  private readonly _utils = new PluginHandlerUtils()

  constructor(
    plugins: NewablePlugin[] = [],
    config: IAppConfig,
    appContext: AppContext
  ) {
    this._plugins = this._utils.getAllUniquePlugins(plugins, config, appContext)
  }

  public async install(context: AppContext) {
    if (this._plugins.length <= 0) return

    await this.installPurePlugins(context)
    await this.installNonPurePlugins(context)

    this.addPluginExtensionsToContext(context)
  }

  /**
   * returns current plugins, mainly used for testing
   */
  public getPlugins() {
    return this._plugins
  }

  private async installPurePlugins(context: AppContext) {
    for (const plug of this._utils.getPurePlugins(this._plugins)) {
      context.logger.success(`Installed ${plug.name}`, 'PLUGIN')
      await plug.install()
    }
  }

  private async installNonPurePlugins(context: AppContext) {
    for (const plug of this._utils.getNonPurePlugins(this._plugins)) {
      context.logger.success(
        `Installed ${plug.name} with ${plug.dependencies?.length} dependency`,
        'PLUGIN'
      )
      await plug.install()
    }
  }

  private addPluginExtensionsToContext(context: AppContext) {
    this._plugins.forEach((plugin) => {
      const extensions = Reflect.getMetadata(
        MetaTypes.extensions,
        plugin.constructor
      )

      if (!extensions || extensions.length <= 0) return

      extensions.forEach((methodName: string) => {
        context[methodName] = plugin[methodName].bind(plugin)
      })
    })
  }
}

export class PluginHandlerUtils {
  public getAllPluginsFromConstructor(plugins: NewablePlugin[]) {
    return plugins.reduce<NewablePlugin[]>((acc, curr) => {
      acc.push(curr)

      // no need to pass depenendencies here, however it would be better prac
      // if we could make this a static prop
      new curr(undefined!, undefined!).dependencies.forEach((dep) => {
        acc.push(dep)
      })

      return acc
    }, [])
  }

  public getAllUniquePlugins(
    plugins: NewablePlugin[],
    config: IAppConfig,
    appContext: AppContext
  ): KondahPlugin[] {
    return this.getAllPluginsFromConstructor(plugins)
      .filter((plug, index, self) => self.indexOf(plug) === index)
      .map((plug) => new plug(config, appContext))
  }

  public getNonPurePlugins(plugins: KondahPlugin[]) {
    return plugins.filter((plug) => plug.dependencies?.length >= 1)
  }

  public getPurePlugins(plugins: KondahPlugin[]) {
    return plugins.filter((plug) => plug.dependencies?.length <= 0)
  }
}
