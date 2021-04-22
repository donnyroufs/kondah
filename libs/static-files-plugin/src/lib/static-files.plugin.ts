import { IKondaContext, Plugin } from '@konda/core'
import express, { Application } from 'express'
import path from 'path'

// This is just a test plugin
export class StaticFilesPlugin extends Plugin {
  public name = 'static-files'

  constructor(private readonly _path: string = 'public') {
    super()
  }

  protected async setup({ server }: IKondaContext) {
    const _server = server.getRawServer<Application>()
    _server.use(
      express.static(path.resolve(`./apps/example-api/src/${this._path}`))
    )
  }
}
