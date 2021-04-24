import 'reflect-metadata'

import { json } from 'express'
import { Konda, KondaContext, IOC } from '@konda/core'
import { UserService } from './user.service'
import { AuthService } from './auth.service'
import { NestedService } from './nested.service'

import './app.controller'
import './user.controller'

export class Application extends Konda {
  public async configureServices(services: IOC) {
    services.setDefaultScope('singleton')

    services.register(AuthService)
    services.register(UserService)
    services.register(NestedService)
  }

  public async setup(context: KondaContext) {
    context.server.use(json())
  }
}
