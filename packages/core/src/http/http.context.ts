export const httpContextToken = Symbol('HttpContext')

export interface IHttpContext<TRequest = any, TResponse = any> {
  req: TRequest
  res: TResponse
}

export class HttpContext implements IHttpContext {
  public constructor(public readonly req: any, public readonly res: any) {}
}
