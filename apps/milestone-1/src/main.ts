import { Application } from './app/application'
import { ExpressAdapter } from '@konda/express-adapter'

new Application({
  server: new ExpressAdapter(),
  plugins: [],
  config: {},
})
