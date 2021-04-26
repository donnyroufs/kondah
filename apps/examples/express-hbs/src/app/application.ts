import { AppContext, Energizor, Konda } from '@konda/core'
import { ExpressAdapter } from '@konda/express-adapter'

import path from 'path'
import handlebars from 'express-handlebars'
import cors from 'cors'

import { RedditService } from './services/reddit.service'

import './controllers/app.controller'
import './api/controllers/reddit.controller'

export class Application extends Konda {
  protected async configureServices(services: Energizor) {
    services.setDefaultScope('singleton')

    services.register(RedditService)
  }

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    ctx.server.engine('handlebars', handlebars())
    ctx.server.set('views', path.resolve('./apps/milestone-1/src/app/views'))
    ctx.server.set('view engine', 'handlebars')

    ctx.server.use(cors())

    this.run(5000)
  }
}
