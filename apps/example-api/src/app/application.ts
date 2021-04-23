import { Konda, IOC, KondaContext } from '@konda/core'
import { UserService } from './user.service'

export class Application extends Konda {
  public async configureServices(services: IOC) {
    services.setDefaultScope('singleton')
    services.register(UserService)
  }

  public async setup(context: KondaContext) {
    context.fromStaticPlugin()
  }
}
