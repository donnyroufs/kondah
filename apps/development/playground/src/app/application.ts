import { AppContext, Energizor, Konda } from '@konda/core'
import { ExpressAdapter } from '@konda/express-adapter'

export class Application extends Konda {
  protected async configureServices(services: Energizor) {
    services.setDefaultScope('singleton')
  }

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    ctx.server.run(5000)
  }
}
