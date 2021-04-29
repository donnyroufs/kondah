import 'dotenv/config'

import { ExpressAdapter } from '@kondah/express-adapter'
import { HttpControllerPlugin } from '@kondah/http-controller'

import { Application } from './application'
import { HelloPlugin } from './plugins/hello.plugin'

new Application({
  server: new ExpressAdapter(),
  plugins: [HttpControllerPlugin, HelloPlugin],
  config: {
    'http-controller': {
      serveRoutes: true,
    },
  },
})
