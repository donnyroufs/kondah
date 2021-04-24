import { KondaContext } from './konda.context'

export abstract class Plugin {
  public abstract name: string

  constructor(private readonly _config: unknown) {}

  public async install(context: KondaContext) {
    await this.setup(context, this.getConfig())
  }

  protected abstract setup<T>(context: KondaContext, config: T): Promise<void>

  private getConfig() {
    return this._config[this.name]
  }
}
