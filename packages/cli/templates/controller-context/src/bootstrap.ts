import { Logger } from '@kondah/core'
import { HttpControllerPlugin } from '@kondah/http-controller'
import { HttpContextPlugin } from '@kondah/http-context'

import { Application } from './application'
import { WelcomePlugin } from './plugins/welcome.plugin'

new Application({
  logger: new Logger('border'),
  plugins: [WelcomePlugin, HttpControllerPlugin, HttpContextPlugin],
  config: {
    'http-controller': {
      serveRoutes: false,
    },
  },
})

/*** Kondah is currently in pre-alpha! ***/

//  available plugins: https://github.com/donnyroufs/kondah/tree/master/packages
//  official website: https://kondah.dev
