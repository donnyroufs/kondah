import { IBoot, ILogger, Injectable } from '../../src'

@Injectable()
export class BootableService implements IBoot {
  public onBoot(logger: ILogger): void | Promise<void> {
    logger.info('booted')
  }
}
