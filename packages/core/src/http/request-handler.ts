export type NextFunc = () => void

export type RequestHandler<TRequest, TResponse> = (
  req: TRequest,
  res: TResponse,
  next: NextFunc
) => void
