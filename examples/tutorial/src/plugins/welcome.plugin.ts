import { IAppConfig, KondahPlugin } from '@kondah/core'
import { HelloPlugin } from './hello.plugin'

export class WelcomePlugin extends KondahPlugin<IAppConfig['welcome-plugin']> {
  public name = 'welcome-plugin'
  public dependencies = [HelloPlugin]

  async setup() {
    [...Array(this.config.amount)].forEach(() => this.appContext.hi())
  }
}
