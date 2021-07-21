import { Energizor } from './energizor'
import { IConfigureServices } from './types'

export abstract class KondahLibrary implements IConfigureServices {
  abstract configureServices(services: Energizor): void
}
