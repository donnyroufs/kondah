import { AppContext, Energizor, Kondah } from '@kondah/core'
import { ExpressAdapter } from '@kondah/express-adapter'

import * as express from 'express'

import { SubscriberRepository } from './subscriber.repository'
import { SubscriberService } from './subscriber.service'

import './subscriber.controller'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.register(SubscriberRepository)
    services.register(SubscriberService)
  }

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    await ctx.connectMongoose()
    ctx.server.use(express.json())

    ctx.server.run(5000)
  }
}
