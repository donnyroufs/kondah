import { ServerAdapter } from './server-adapter';
import { Plugin } from './plugin';
import { IOC as _IOC } from './ioc';

export interface IKondaContext {
  server: Omit<ServerAdapter, 'run'>;
  ioc: IOC;
}

export interface IKondaOptions {
  server: ServerAdapter;
  plugins?: Plugin[];
}

export type IOC = _IOC;
