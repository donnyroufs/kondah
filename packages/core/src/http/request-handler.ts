import { IKondahRequest } from './kondah-request.interface'
import { IKondahResponse } from './kondah-response.interface'

export type NextFunc = () => void

export type RequestHandler = (
  req: IKondahRequest,
  res: IKondahResponse,
  next: NextFunc
) => void
