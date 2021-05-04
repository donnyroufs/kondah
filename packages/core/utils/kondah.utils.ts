import { AppContext } from '../src/contexts'
import { Energizor } from '../src/energizor'
import { ILogger } from '../src/types'
import { Kondah } from '../src/kondah'

export class App extends Kondah {
  protected async configureServices(services: Energizor) {}
  protected async setup(context: AppContext) {}
}

export class CoolLogger implements ILogger {
  info(msg: string) {
    return msg
  }

  success(msg: string) {
    return msg
  }

  warning(msg: string) {
    return msg
  }

  error(msg: string) {
    return msg
  }
}
