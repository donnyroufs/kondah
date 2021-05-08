import { AddToContext, AppContext, KondahPlugin } from '@kondah/core'

export class WelcomePlugin extends KondahPlugin {
  public name = 'hello-plugin'

  async setup() {}

  @AddToContext()
  welcome() {
    this.appContext.logger.info('Welcome 🙌!', this.name.toUpperCase())
  }
}
