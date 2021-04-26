import { Application } from './app/application'
import { ExpressAdapter } from '@konda/express-adapter'
import { HttpControllerPlugin } from '@konda/http-controller'

// Temporarly exporting because there's no proper way to
// inject the AppContext right now.
export const app = new Application({
  server: new ExpressAdapter(),
  plugins: [HttpControllerPlugin],
  config: {
    'http-controller': {
      serveRoutes: true,
    },
  },
})
