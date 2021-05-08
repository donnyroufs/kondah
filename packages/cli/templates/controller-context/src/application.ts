import { AppContext, Energizor, Kondah } from '@kondah/core'

import './controllers'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {}
  protected async setup(ctx: AppContext) {
    ctx.welcome()
    ctx.server.run(5000)
  }
}
