import { AppContext, Energizor, Konda } from '@konda/core'
import { ExpressAdapter } from '@konda/express-adapter'

export class Application extends Konda {
  protected async configureServices(services: Energizor) {}

  protected async setup(context: AppContext<ExpressAdapter>) {
    console.log('bootstrapped')
  }
}
