import { AppContext } from './app.context'

export abstract class Plugin {
  public abstract name: string

  constructor(private readonly _config: unknown) {}

  public async install(context: AppContext) {
    await this.setup(context, this.getConfig())
  }

  protected abstract setup<T>(context: AppContext, config: T): Promise<void>

  private getConfig() {
    return this._config[this.name]
  }
}
