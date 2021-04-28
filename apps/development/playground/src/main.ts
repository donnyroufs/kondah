import { Application } from './app/application'
import { ExpressAdapter } from '@kondah/express-adapter'
import { HttpControllerPlugin } from '@kondah/http-controller'

new Application({
  server: new ExpressAdapter(),
  plugins: [HttpControllerPlugin],
  config: {
    'http-controller': {
      serveRoutes: true,
    },
  },
})
