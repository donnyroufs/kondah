/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppContext } from './app.context'

export abstract class Plugin {
  public abstract name: string

  constructor(protected readonly _config: any) {}

  public async install(context: AppContext) {
    await this.setup(context, this.getConfig())
  }

  protected abstract setup(context: AppContext, config: any): Promise<void>

  private getConfig() {
    return this._config[this.name]
  }
}
