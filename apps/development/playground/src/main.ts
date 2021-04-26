import { Application } from './app/application'
import { ExpressAdapter } from '@kondah/express-adapter'

new Application({
  server: new ExpressAdapter(),
  plugins: [],
  config: {},
})
