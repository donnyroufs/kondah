import { ExcludeHooks, ICollection, IEnergizor } from '../../src'
import { CountService } from './count.service'

export class AppCollection implements ICollection {
  public configureServices(services: ExcludeHooks<IEnergizor>): void {
    services.addTransient(CountService)
  }
}
