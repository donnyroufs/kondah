import 'reflect-metadata'

import { AddToContext, AppContext } from '../src'
import { KondahPlugin } from '../src/kondah-plugin'

export class PurePluginA extends KondahPlugin {
  public name = 'pure-plugin-a'

  protected async setup(context: AppContext) {}
}

export class PurePluginB extends KondahPlugin {
  public name = 'pure-plugin-b'

  protected async setup(context: AppContext) {}
}

export class PluginC extends KondahPlugin {
  public name = 'plugin-c'
  public dependencies = [PurePluginA, PurePluginB]

  protected async setup(context: AppContext) {}
}

export class PluginWithContextExtensions extends KondahPlugin {
  public name = 'plugin-with-context-extensions'

  protected async setup(context: AppContext) {}

  @AddToContext()
  hello() {
    return 'hello'
  }
}

export class PluginWithContextExtensionsB extends KondahPlugin {
  public name = 'plugin-with-context-extensions'

  protected async setup(context: AppContext) {}

  @AddToContext()
  hello() {
    return 'hello'
  }
}
