import { AppContext, Energizor, Kondah } from '@kondah/core'
import { ExpressAdapter } from '@kondah/express-adapter'

import * as express from 'express'

import { SubscriberRepository } from './subscriber.repository'
import { SubscriberService } from './subscriber.service'

import './subscriber.controller'
import subscriberModel from './subscriber.model'

export class Application extends Kondah {
  // TODO: Add factory and async factory
  protected async configureServices(services: Energizor) {
    services.register(SubscriberRepository)
    services.register(SubscriberService)
  }

  // NOTE: possible way to do some preconfiguration with plugins before we hit setup
  // protected async $preSetup() {}

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    await ctx.connectMongoose()

    ctx.server.use(express.json())

    ctx.server.get('/', (req, res, next) => {
      ctx.logSubscribersOnVisit(subscriberModel)
      res.json({})
    })

    ctx.server.run(5000)
  }
}
