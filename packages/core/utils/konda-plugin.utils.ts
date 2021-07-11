import { AppContext } from '../src/contexts'
import { KondahPlugin } from '../src/kondah-plugin'

export class HelloPlugin extends KondahPlugin {
  public name = 'hello-plugin'

  protected async setup() {}
}
