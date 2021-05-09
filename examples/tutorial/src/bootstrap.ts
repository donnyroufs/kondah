import path from 'path'

import { Logger } from '@kondah/core'
import { HttpControllerPlugin } from '@kondah/http-controller'

import { Application } from './application'
import { WelcomePlugin } from './plugins/welcome.plugin'

new Application({
  logger: new Logger('border'),
  plugins: [HttpControllerPlugin, WelcomePlugin],
  config: {
    'http-controller': {
      controllersPath: [path.join(__dirname, '../src/controllers')],
      catchExceptions: true,
    },
    'welcome-plugin': {
      amount: 5,
    },
  },
})
