import 'reflect-metadata'

import { AddToContext, AppContext } from '../src'
import { KondahPlugin } from '../src/kondah-plugin'

export class PurePluginA extends KondahPlugin {
  public name = 'pure-plugin-a'

  protected async setup() {}
}

export class PurePluginB extends KondahPlugin {
  public name = 'pure-plugin-b'

  protected async setup() {}
}

export class PluginC extends KondahPlugin {
  public name = 'plugin-c'
  public dependencies = [PurePluginA, PurePluginB]

  protected async setup() {}
}

export class PluginWithContextExtensions extends KondahPlugin {
  public name = 'plugin-with-context-extensions'

  protected async setup() {}

  @AddToContext()
  hello() {
    return 'hello'
  }
}

export class PluginWithContextExtensionsB extends KondahPlugin {
  public name = 'plugin-with-context-extensions'

  protected async setup() {}

  @AddToContext()
  hello() {
    return 'hello'
  }
}

export class PluginWithComposedPluginAsDep extends KondahPlugin {
  public name = 'plugin-with-composed-plugin-as-dep'
  public dependencies = [PluginC]

  protected async setup() {}
}
