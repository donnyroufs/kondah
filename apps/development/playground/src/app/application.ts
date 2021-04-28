import { AppContext, Energizor, Injectable, Kondah } from '@kondah/core'
import { ExpressAdapter } from '@kondah/express-adapter'
import { Controller, Get } from '@kondah/http-controller'
import { Person } from '../main'

@Injectable()
export class DatabaseService {
  findUser() {
    return { id: 1, name: 'donny' }
  }
}

@Injectable()
class UserService {
  constructor(
    // private readonly _person: Person,
    private readonly _appContext: AppContext
  ) {}

  doSomething() {
    //@ts-expect-error yes
    console.log(this._appContext.authenticate())
    // this._person.greet()
  }
}

@Controller('/')
class AppController {
  // constructor(private readonly _userService: UserService) {}
  constructor(private readonly _appContext: AppContext) {}

  @Get('/')
  index(req, res) {
    // res.json(this._userService.doSomething())
    // @ts-expect-error Yes
    res.json(this._appContext.authenticate())
  }
}

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.setDefaultScope('singleton')

    services.register(UserService)
    services.register(DatabaseService)
  }

  /**
   * Gives us access to all the installed plugins before we run Kondah Setup.
   * Some plugins might require some kind of implementation that we do not expose by default
   * like our database. So in here we can provide it.
   */
  protected async preInstall(currentPlugins: any) {
    // add the required functionality?
    currentPlugins.required = [() => null]
  }

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    // console.log(ctx.energizor)
    // ctx.energizor.get(UserService)
    console.log(ctx.energizor.get(Person).greet())
    ctx.energizor.get(UserService).doSomething()

    // ctx.on('serialize-user', () => database.findOne(...))
    // ctx.on('deserialize-user', (user) => user.id)

    ctx.server.run(5000)
  }
}
