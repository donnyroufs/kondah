import { AppContext, Energizor, Kondah } from '@kondah/core'
import { AppService } from './app.service'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.setDefaultScope('singleton')

    services.register(AppService)
  }

  protected async setup(ctx: AppContext) {
    ctx.hi()
    ctx.addControllers()
    ctx.server.run(5000)
  }
}
