import 'reflect-metadata'

import { Konda, IOC, KondaContext } from '@konda/core'
import { UserService } from './user.service'
import { AuthService } from './auth.service'
import { NestedService } from './nested.service'

console.clear()

export class Application extends Konda {
  public async configureServices(services: IOC) {
    services.setDefaultScope('singleton')

    services.register(AuthService)
    services.register(UserService)
    services.register(NestedService)
  }

  public async setup(context: KondaContext) {
    const u = context.ioc.get(UserService)
    console.log(u.getUsers())
  }
}
