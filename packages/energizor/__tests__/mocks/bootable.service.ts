import { IBoot, ILogger, Injectable, Injectable } from '../../src'
import { MockedLogger } from './mocked-logger'

@Injectable()
export class BootableService implements IBoot {
  public onBoot(): void | Promise<void> {}
}
