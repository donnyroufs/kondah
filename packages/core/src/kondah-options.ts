import { IHttpDriver } from './http/http-adapter.interface'
import { IKondahLogger } from './types'

export class KondahOptions {
  public constructor(
    public httpDriver: IHttpDriver,
    public logger?: IKondahLogger
  ) {}
}
