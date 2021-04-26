import { Application } from './app/application'
import { ExpressAdapter } from '@konda/express-adapter'
import { HttpControllerPlugin } from '@konda/http-controller'

export const app = new Application({
  server: new ExpressAdapter(),
  plugins: [HttpControllerPlugin],
  config: {
    'http-controller': {
      serveRoutes: true,
    },
  },
})
