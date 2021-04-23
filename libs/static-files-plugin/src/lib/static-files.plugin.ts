import { IKondaContext, Plugin } from '@konda/core'
import express from 'express'
import path from 'path'

// This is just a test plugin
export class StaticFilesPlugin extends Plugin {
  public name = 'static-files'

  constructor(private readonly _path: string = 'public') {
    super()
  }

  // TODO: Remove (add) from IKondaContext,
  // rename KondaContext to AppContext
  // Add as object instead of own args
  // Create seperate methods to register new things to the AppContext || create decorator to add to context!
  // later on add HttpContext
  protected async setup(context: IKondaContext) {
    context.add('fromStaticPlugin', this.log.bind(this))

    context.server.use(
      express.static(path.resolve(`./apps/example-api/src/${this._path}`))
    )
  }

  // e.g. @AddToContext('log')
  private log() {
    console.log('hello from static plugin')
  }
}
