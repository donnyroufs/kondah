import { Konda, IOC, IKondaContext } from '@konda/core';

export class Application extends Konda {
  public async configureServices(services: IOC) {
    services.setDefaultScope('singleton');
  }

  public async setup(context: IKondaContext) {
    console.log('setup is running');
  }
}
