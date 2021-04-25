import { Plugin } from './plugin'
import { AppContext } from './app.context'
import { MetadataStore } from './metadata.store'
import { IAppConfig, NewablePlugin } from './types'

export class PluginManager {
  private readonly _plugins: Plugin[]
  private readonly _config: IAppConfig

  constructor(plugins: NewablePlugin[] = [], config: IAppConfig) {
    this._config = config
    this._plugins = plugins.map((plug) => new plug(config))
  }

  public async install(context: AppContext) {
    if (this._plugins.length <= 0) return

    for (const plug of this._plugins) {
      await plug.install(context)
    }

    // this._plugins.forEach((plug) => ))
    this.addPluginExtensionsToContext(context)
  }

  private addPluginExtensionsToContext(context: AppContext) {
    Object.entries(MetadataStore.AppContext).forEach(
      ([k, v]) => (context[k] = v)
    )
    MetadataStore.AppContext = {}
  }
}
