import { Plugin } from './plugin'
import { KondaContext } from './konda.context'
import { Dumpster } from './dumpster'
import { IAppConfig, NewablePlugin } from './types'

export class PluginManager {
  private readonly _plugins: Plugin[]
  private readonly _config: IAppConfig

  constructor(plugins: NewablePlugin[] = [], config: IAppConfig) {
    this._config = config
    this._plugins = plugins.map((plug) => new plug(config))
  }

  public async install(context: KondaContext) {
    if (this._plugins.length <= 0) return

    for (const plug of this._plugins) {
      await plug.install(context)
    }

    // this._plugins.forEach((plug) => ))
    this.addPluginExtensionsToContext(context)
  }

  private addPluginExtensionsToContext(context: KondaContext) {
    Object.entries(Dumpster.KondaContext).forEach(([k, v]) => (context[k] = v))
    Dumpster.KondaContext = {}
  }
}
