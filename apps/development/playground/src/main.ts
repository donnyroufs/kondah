import { Application, DatabaseService } from './app/application'
import { ExpressAdapter } from '@kondah/express-adapter'
import {
  AddToContext,
  AppContext,
  IAppConfig,
  Plugin,
  ServerAdapter,
} from '@kondah/core'
import { HttpControllerPlugin } from '@kondah/http-controller'

export class Person {
  greet() {
    return 'hey'
  }
}

export class StupidPlugin extends Plugin {
  public name = 'stupid-plugin'

  protected async setup(context: AppContext<ServerAdapter>) {
    context.energizor.register(Person)
  }

  @AddToContext()
  authenticate() {
    return 'authenticated'
  }
}

export class AuthPlugin extends Plugin {
  public name = 'auth-plugin'

  protected async setup(
    context: AppContext<ServerAdapter>,
    config: IAppConfig
  ) {
    console.log('installing auth plugin')

    // We can get things from the dependency container here! Since plugins run AFTER we register all our services
    // console.log('exists:', !!context.energizor.get('UserService'))

    // if(config.driver === 'prisma') {
    //   const db = context.energizor.get(DatabaseService)
    //   const user = db.findUser()
    // }
  }
}

new Application({
  server: new ExpressAdapter(),
  plugins: [StupidPlugin, HttpControllerPlugin, AuthPlugin],
  config: {
    'http-controller': {
      serveRoutes: true,
    },
  },
})
