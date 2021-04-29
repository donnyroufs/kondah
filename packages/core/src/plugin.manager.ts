import { Plugin } from './plugin'
import { AppContext } from './contexts'
import { IAppConfig, NewablePlugin } from './types'
import { MetaTypes } from './metadata.types'

export class PluginManager {
  private readonly _plugins: Plugin[]

  constructor(plugins: NewablePlugin[] = [], config: IAppConfig) {
    this._plugins = plugins.map((plug) => new plug(config))
  }

  public async install(context: AppContext) {
    if (this._plugins.length <= 0) return

    for (const plug of this._plugins) {
      await plug.install(context)
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
}
