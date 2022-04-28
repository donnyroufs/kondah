export const httpContextToken = Symbol('HttpContext')

export interface IHttpContext<TRequest, TResponse> {
  req: TRequest
  res: TResponse
}
