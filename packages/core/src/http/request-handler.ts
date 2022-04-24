export type NextFunc = () => void

export interface IResponse {
  json<T>(data: T): void
}

export type RequestHandler<TRequest, TResponse extends IResponse> = (
  req: TRequest,
  res: TResponse,
  next: NextFunc
) => void
