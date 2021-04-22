import { Application } from './app/application'
import { ExpressAdapter } from '@konda/express-adapter'
import { StaticFilesPlugin } from '@konda/static-files-plugin'

const app = new Application({
  server: new ExpressAdapter(),
  plugins: [new StaticFilesPlugin()],
})

const ctx = app.getContext()

// ctx.
