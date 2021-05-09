import { AddToContext, AppContext, KondahPlugin } from '@kondah/core'

export class HelloPlugin extends KondahPlugin {
  public name = 'hello-plugin'

  async setup(ctx: AppContext) {}

  @AddToContext()
  hi() {
    console.log('hi you! 🙌')
  }
}
