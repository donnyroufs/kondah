import { Logger } from '@kondah/core'
import { Application } from './application'

new Application({
  logger: new Logger('border'),
  plugins: [],
  config: {},
})
