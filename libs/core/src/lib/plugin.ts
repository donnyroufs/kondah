import { IKondaContext } from './types'

export abstract class Plugin {
  public abstract name: string

  public install(context: IKondaContext) {
    this.setup(context)
  }

  protected abstract setup(context: IKondaContext): Promise<void>
}
