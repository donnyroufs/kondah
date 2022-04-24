import { IHttpDriver } from './http/http-adapter.interface'
import { IKondahLogger } from './types'

export class KondahOptions {
  public constructor(
    // TODO: Add types
    public httpDriver: IHttpDriver<any, any, any>,
    public logger?: IKondahLogger
  ) {}
}
