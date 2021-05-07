import { KondahPlugin } from './kondah-plugin'
import { AppContext } from './contexts'
import { IAppConfig, NewablePlugin } from './types'
import { MetaTypes } from './metadata.types'

export class PluginManager {
  private readonly _plugins: KondahPlugin[] = []

  constructor(
    plugins: NewablePlugin[] = [],
    config: IAppConfig,
    appContext: AppContext
  ) {
    const _plugs = plugins.reduce<NewablePlugin[]>((acc, curr) => {
      acc.push(curr)

      new curr(config, appContext).dependencies.forEach((dep) => {
        acc.push(dep)
      })

      return acc
    }, [])

    this._plugins = _plugs
      .filter((plug, index, self) => self.indexOf(plug) === index)
      .map((plug) => new plug(config, appContext))
  }

  public async install(context: AppContext) {
    if (this._plugins.length <= 0) return

    for (const plug of this.getPurePlugins()) {
      context.logger.success(`Installed ${plug.name}`, 'PLUGIN')
      await plug.install()
    }

    for (const plug of this.getNonPurePlugins()) {
      context.logger.success(
        `Installed ${plug.name} with ${plug.dependencies?.length} dependency`,
        'PLUGIN'
      )
      await plug.install()
    }

    this.addPluginExtensionsToContext(context)
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

  private getNonPurePlugins() {
    return this._plugins.filter((plug) => plug.dependencies?.length >= 1)
  }

  private getPurePlugins() {
    return this._plugins.filter((plug) => plug.dependencies?.length <= 0)
  }
}
