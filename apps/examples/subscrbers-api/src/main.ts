import 'dotenv/config'

import { Application } from './app/application'
import { ExpressAdapter } from '@kondah/express-adapter'
import { HttpControllerPlugin } from '@kondah/http-controller'
import { MongoosePlugin } from './app/plugins/mongoose.plugin'

new Application({
  server: new ExpressAdapter(),
  plugins: [HttpControllerPlugin, MongoosePlugin],
  config: {
    'http-controller': {
      serveRoutes: false,
    },
    mongoose: {
      uri: process.env.DB_URI,
    },
  },
})
