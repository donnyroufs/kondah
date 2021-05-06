import 'reflect-metadata'

import { AddToContext, AppContext, Plugin } from '@kondah/core'

export class HttpContextPlugin extends Plugin {
  name = 'http-context'

  protected async setup(context: AppContext) {
    context.server.use((req, res, next) => {
      // @ts-expect-error does not exist yet
      if (!req.kondah) {
        // @ts-expect-error does not exist yet
        req.kondah = {}
      }

      // @ts-expect-error does not exist yet
      req.kondah.httpContext = {
        req,
        res,
      }

      next()
    })
  }

  @AddToContext()
  addToHttpContext<T>(key: string, fn: T) {
    console.log({ key, fn })
  }
}
