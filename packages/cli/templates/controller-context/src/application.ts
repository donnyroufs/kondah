import { AppContext, Energizor, Kondah } from '@kondah/core'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {}
  protected async setup(ctx: AppContext) {
    ctx.welcome()
    ctx.addControllers()

    ctx.server.run(5000)
  }
}
