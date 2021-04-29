import { AppContext, Energizor, Kondah } from '@kondah/core'
import { ExpressAdapter } from '@kondah/express-adapter'

import { AppService } from './app.service'
import './app.controller'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.register(AppService)
  }

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    ctx.hi()
    ctx.server.run(5000)
  }
}
