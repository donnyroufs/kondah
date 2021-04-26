import { AppContext, Energizor, Kondah } from '@kondah/core'
import { ExpressAdapter } from '@kondah/express-adapter'

import path from 'path'
import handlebars from 'express-handlebars'
import cors from 'cors'

import { RedditService } from './services/reddit.service'

import './controllers/app.controller'
import './api/controllers/reddit.controller'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.setDefaultScope('singleton')

    services.register(RedditService)
  }

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    ctx.server.engine('handlebars', handlebars())
    ctx.server.set(
      'views',
      path.resolve('./apps/examples/express-hbs/src/app/views')
    )
    ctx.server.set('view engine', 'handlebars')

    ctx.server.use(cors())

    ctx.server.run(5000)
  }
}
