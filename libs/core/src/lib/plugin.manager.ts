import { Plugin } from './plugin';
import { IKondaContext } from './types';

export class PluginManager {
  constructor(private readonly plugins: Plugin[] = []) {}

  public async install(context: IKondaContext) {
    if (this.plugins.length <= 0) return;

    this.plugins.forEach((plug) => plug.install(context));
  }
}
