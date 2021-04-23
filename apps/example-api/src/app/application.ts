import 'reflect-metadata'
import { Konda, KondaContext, IOC, RouteDefinition } from '@konda/core'
import { UserService } from './user.service'
import { AuthService } from './auth.service'
import { NestedService } from './nested.service'

import { AppController as controller } from './app.controller'
import { Request, Response } from 'express'

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
    // const u = context.ioc.get(UserService)
    // // Test nested dep
    // console.log(u.getNested())

    // // Check if singleton dep works
    // u.addUser()
    // u.addUser()
    // console.log({ get1: u.getUsers() })
    // const u2 = context.ioc.get(UserService)
    // console.log({ get2: u2.getUsers() })
    // context.ioc.rebind(UserService.name, UserService)
    // const u3 = context.ioc.get(UserService)
    // console.log({ get3: u3.getUsers() }) // should be empty

    const app = context.server.getRawServer()

    // Iterate over all our controllers and register our routes
    const instance = new controller()
    // The prefix saved to our controller
    const prefix = Reflect.getMetadata('prefix', controller)
    // Our `routes` array containing all our routes for this controller
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      'routes',
      controller
    )

    console.clear()
    console.log(routes)
    // Iterate over all routes and register them to our express application
    routes.forEach((route) => {
      // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
      // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
      // this should be enough for now.
      app[route.requestMethod](prefix + route.path, (request, response) => {
        // TODO: pass custom context
        instance[route.methodName]({ request, response })
      })
    })
  }
}
