/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppContext } from './app.context'
import { IAppConfig } from './types'

export abstract class Plugin<T = any> {
  public abstract name: string

  constructor(private readonly _config: IAppConfig) {}

  public async install(context: AppContext) {
    await this.setup(context)
  }

  protected abstract setup(context: AppContext): Promise<void>

  protected get config(): T {
    return this._config[this.name]
  }
}
