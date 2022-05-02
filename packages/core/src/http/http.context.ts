import { IKondahRequest } from './kondah-request.interface'
import { IKondahResponse } from './kondah-response.interface'

export const httpContextToken = Symbol('HttpContext')

export interface IHttpContext {
  req: IKondahRequest
  res: IKondahResponse
}

export class HttpContext implements IHttpContext {
  public constructor(
    public readonly req: IKondahRequest,
    public readonly res: IKondahResponse
  ) {}
}
