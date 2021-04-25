import { AddToContext, IAppConfig, IAppContext, Plugin } from '@konda/core'
import express from 'express'
import path from 'path'

export class StaticFilesPlugin extends Plugin {
  public name = 'static-files'

  protected async setup(
    context: IAppContext,
    config: IAppConfig['static-files']
  ) {
    context.server.use(
      express.static(path.resolve(`./apps/example-api/src/${config.path}`))
    )
  }

  @AddToContext()
  protected fromStaticPlugin() {
    console.log('hello from static plugin')
  }
}
