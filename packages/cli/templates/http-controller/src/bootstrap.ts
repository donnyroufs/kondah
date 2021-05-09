import { Logger } from '@kondah/core'
import { HttpControllerPlugin } from '@kondah/http-controller'

import path from 'path'

import { Application } from './application'
import { WelcomePlugin } from './plugins/welcome.plugin'

new Application({
  logger: new Logger('border'),
  plugins: [WelcomePlugin, HttpControllerPlugin],
  config: {
    'http-controller': {
      controllersPath: [path.join(__dirname, '../src/controllers')],
      catchExceptions: true,
    },
  },
})

/*** Kondah is currently in pre-alpha! ***/

//  available plugins: https://github.com/donnyroufs/kondah/tree/master/packages
//  official website: https://kondah.dev
