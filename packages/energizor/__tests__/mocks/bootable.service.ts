import { IBoot, Injectable } from '../../src'

@Injectable()
export class BootableService implements IBoot {
  public onBoot(): void | Promise<void> {}
}
