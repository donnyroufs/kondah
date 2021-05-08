/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppContext } from './contexts'
import { IAppConfig, NewablePlugin } from './types'

export abstract class KondahPlugin<T = any> {
  public abstract name: string
  /**
   * A plugin can depend on other plugins which will cause race conditions,
   * therefor you need to let Kondah know which plugins need to be installed
   * before installing this one.
   */
  public dependencies: NewablePlugin[] = []

  constructor(
    private readonly _config: IAppConfig,
    protected readonly appContext: AppContext
  ) {}

  public async install() {
    await this.setup(this.appContext)
  }

  protected abstract setup(context: AppContext): Promise<void> | void

  protected get config(): T {
    return this._config[this.name]
  }
}
