import 'reflect-metadata'
import { Konda, IOC, IKondaContext } from '@konda/core'
import { UserService } from './user.service'
import { AuthService } from './auth.service'

export class Application extends Konda {
  public async configureServices(services: IOC) {
    services.setDefaultScope('singleton')

    services.register(AuthService)
    services.register(UserService)
  }

  public async setup(context: IKondaContext) {
    // @ts-expect-error yes
    console.log(context.ioc._dependencies.get('UserService'))
    // context.fromStaticPlugin()
  }
}
