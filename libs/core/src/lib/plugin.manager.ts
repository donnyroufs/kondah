import { Plugin } from './plugin'
import { KondaContext } from './konda.context'
import { Dumpster } from './dumpster'

export class PluginManager {
  constructor(private readonly plugins: Plugin[] = []) {}

  public async install(context: KondaContext) {
    if (this.plugins.length <= 0) return

    this.plugins.forEach((plug) => plug.install(context))
    this.addPluginExtensionsToContext(context)
  }

  private addPluginExtensionsToContext(context: KondaContext) {
    Object.entries(Dumpster.KondaContext).forEach(([k, v]) => (context[k] = v))
    Dumpster.KondaContext = {}
  }
}
