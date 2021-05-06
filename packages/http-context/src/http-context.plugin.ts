import 'reflect-metadata'

import { AddToContext, AppContext, Plugin } from '@kondah/core'
import { HttpContextBuilder } from './http-context.builder'

export class HttpContextPlugin extends Plugin {
  name = 'http-context'

  private _state = {}

  protected async setup(context: AppContext) {
    // @ts-expect-error we dont have types for this
    context.server.use((req: Request & { kondah: any }, res, next) => {
      req.kondah.httpContext = new HttpContextBuilder(req, res, context.logger)
        .addMany(this._state)
        .build()

      next()
    })
  }

  @AddToContext()
  addToHttpContext<T = unknown>(key: string, value: T) {
    if (this._state[key]) {
      // TODO: Add custom exception
      throw new Error('already exists')
    }

    this._state[key] = value
  }
}
