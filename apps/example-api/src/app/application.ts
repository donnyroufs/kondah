import 'reflect-metadata'
import { Konda, KondaContext, IOC } from '@konda/core'
import { UserService } from './user.service'
import { AuthService } from './auth.service'
import { NestedService } from './nested.service'

import { Request, Response } from 'express'

import './app.controller'

export type HttpContext = {
  request: Request
  response: Response
}

export class Application extends Konda {
  public async configureServices(services: IOC) {
    services.setDefaultScope('singleton')

    services.register(AuthService)
    services.register(UserService)
    services.register(NestedService)
  }

  public async setup(context: KondaContext) {
    const u = context.ioc.get(UserService)
    // Test nested dep
    console.log(u.getNested())
    // Check if singleton dep works
    u.addUser()
    u.addUser()
    console.log({ get1: u.getUsers() })
    const u2 = context.ioc.get(UserService)
    console.log({ get2: u2.getUsers() })
    context.ioc.rebind(UserService.name, UserService)
    const u3 = context.ioc.get(UserService)
    console.log({ get3: u3.getUsers() }) // should be empty
  }
}
