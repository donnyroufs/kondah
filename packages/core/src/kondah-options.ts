import { IHttpDriver } from './http/http-adapter.interface'
import { IKondahLogger } from './types'

export type Constructor<T = unknown> = new (...args: any[]) => T

export class KondahOptions {
  public constructor(
    // TODO: Add types
    public httpDriver: Constructor<IHttpDriver<any, any, any>>,
    public logger?: IKondahLogger
  ) {}
}
