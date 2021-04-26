import { AppContext, Energizor, Kondah } from '@kondah/core'
import { ExpressAdapter } from '@kondah/express-adapter'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.setDefaultScope('singleton')
  }

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    ctx.server.run(5000)
  }
}
