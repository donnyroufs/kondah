import { AddToContext, AppContext, KondahPlugin } from '@kondah/core'

export class HelloPlugin extends KondahPlugin {
  public name = 'hello-plugin'

  async setup() {}

  @AddToContext()
  hi() {
    console.log('hi you! 🙌')
  }
}
