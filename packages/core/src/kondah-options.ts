import { Energizor } from '@kondah/energizor'
import { IEnergizor } from '.'
import { IHttpDriver } from './http/http-adapter.interface'
import { IKondahLogger } from './types'

export type Constructor<T = unknown> = new (...args: any[]) => T

export class KondahOptions {
  public constructor(
    public httpDriver: Constructor<IHttpDriver<any, any, any>>,
    public logger?: IKondahLogger,
    public energizor?: Energizor
  ) {}
}
