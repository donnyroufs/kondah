import 'reflect-metadata'

import { Konda, IOC, KondaContext } from '@konda/core'
import { UserService } from './user.service'
import { AuthService } from './auth.service'

export class Application extends Konda {
  public async configureServices(services: IOC) {
    services.setDefaultScope('singleton')

    services.register(AuthService)
    services.register(UserService)
  }

  public async setup(context: KondaContext) {
    context.fromStaticPlugin()
  }
}
