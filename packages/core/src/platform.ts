import { IEnergizor } from '.'
import { KondahPlugin } from './plugin'

export class KondahPlatformOpts<T> {
  public constructor(public readonly plugins: KondahPlugin<T>[] = []) {}
}

export abstract class KondahPlatform<
  T extends KondahPlatformOpts<unknown> = KondahPlatformOpts<unknown>
> {
  public energizor!: IEnergizor

  public constructor(protected opts: T) {}

  public async installPlugins() {
    for (const plug of this.opts.plugins) {
      await plug.install(this)
    }
  }

  public abstract boot(): Promise<void>
}
