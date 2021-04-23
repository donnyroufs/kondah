import { Application } from './app/application'
import { ExpressAdapter } from '@konda/express-adapter'
import { StaticFilesPlugin } from '@konda/static-files-plugin'

console.clear()

new Application({
  server: new ExpressAdapter(),
  plugins: [new StaticFilesPlugin()],
})
