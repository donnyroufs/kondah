import { Plugin } from './plugin'
import { KondaContext } from './konda.context'

export class PluginManager {
  constructor(private readonly plugins: Plugin[] = []) {}

  public async install(context: KondaContext) {
    if (this.plugins.length <= 0) return

    this.plugins.forEach((plug) => plug.install(context))
  }
}
