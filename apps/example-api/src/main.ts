import { Application } from './app/application'
import { ExpressAdapter } from '@konda/express-adapter'
import { StaticFilesPlugin } from '@konda/static-files-plugin'
import { HttpControllerPlugin } from '@konda/http-controller'
import { appConfig } from './app/app.config'

new Application({
  server: new ExpressAdapter(),
  plugins: [StaticFilesPlugin, HttpControllerPlugin],
  config: appConfig,
})
