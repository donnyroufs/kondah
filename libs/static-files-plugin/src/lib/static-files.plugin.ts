import { AddToContext, IKondaContext, Plugin } from '@konda/core'
import express from 'express'
import path from 'path'

/* This is just a test plugin */
export class StaticFilesPlugin extends Plugin {
  public name = 'static-files'

  constructor(private readonly _path: string = 'public') {
    super()
  }

  protected async setup(context: IKondaContext) {
    context.server.use(
      express.static(path.resolve(`./apps/example-api/src/${this._path}`))
    )
  }

  @AddToContext()
  protected fromStaticPlugin() {
    console.log('hello from static plugin')
  }
}
