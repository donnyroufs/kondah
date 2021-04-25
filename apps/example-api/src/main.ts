import { ExpressAdapter } from '@konda/express-adapter'
import { StaticFilesPlugin } from '@konda/static-files-plugin'
import { HttpControllerPlugin } from '@konda/http-controller'
import { Application } from './app/application'
import { appConfig } from './app/app.config'

export const app = new Application({
  server: new ExpressAdapter(),
  plugins: [StaticFilesPlugin, HttpControllerPlugin],
  config: appConfig,
})
