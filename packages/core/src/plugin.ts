/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppContext } from './contexts'
import { IAppConfig, NewablePlugin } from './types'

export abstract class Plugin<T = any> {
  public abstract name: string
  /**
   * A plugin can depend on other plugins which will cause race conditions,
   * therefor you need to let Kondah know which plugins need to be installed
   * before installing this one.
   */
  public dependencies: NewablePlugin[] | string[] = []

  constructor(private readonly _config: IAppConfig) {}

  public async install(context: AppContext) {
    await this.setup(context)
  }

  protected abstract setup(context: AppContext): Promise<void>

  protected get config(): T {
    return this._config[this.name]
  }
}
