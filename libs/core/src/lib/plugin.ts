import { KondaContext } from './konda.context'

export abstract class Plugin {
  public abstract name: string

  public install(context: KondaContext) {
    this.setup(context)
  }

  protected abstract setup(context: KondaContext): Promise<void>
}
