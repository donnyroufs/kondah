import { Energizor } from '@kondah/energizor'
import { IHttpDriver } from './http/http-adapter.interface'
import { IKondahLogger } from './types'

export type Constructor<T = unknown> = new (...args: any[]) => T

export class KondahOptions {
  public constructor(
    public httpDriver: Constructor<IHttpDriver>,
    public logger?: IKondahLogger,
    public energizor?: Energizor
  ) {}
}
