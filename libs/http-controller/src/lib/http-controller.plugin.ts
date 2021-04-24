import { KondaContext, Plugin } from '@konda/core'

export class HttpControllerPlugin extends Plugin {
  public name = 'http-controller'

  protected setup<T>(context: KondaContext, config: T): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
